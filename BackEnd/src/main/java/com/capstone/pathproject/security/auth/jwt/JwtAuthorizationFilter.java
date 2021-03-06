package com.capstone.pathproject.security.auth.jwt;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.util.ClientUtil;
import com.capstone.pathproject.util.CookieUtil;
import com.capstone.pathproject.util.JwtTokenUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.PatternMatchUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private final MemberRepository memberRepository;
    private final StringRedisTemplate redisTemplate;
    private final JwtTokenUtil jwtTokenUtil;
    private final CookieUtil cookieUtil;
    private static final String[] whiteList = {"/", "/login", "/logout", "/odsay/**", "/kakao/**", "/api/image/**"};

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, MemberRepository memberRepository, StringRedisTemplate redisTemplate, JwtTokenUtil jwtTokenUtil, CookieUtil cookieUtil) {
        super(authenticationManager);
        this.memberRepository = memberRepository;
        this.redisTemplate = redisTemplate;
        this.jwtTokenUtil = jwtTokenUtil;
        this.cookieUtil = cookieUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) {
        String requestURI = request.getRequestURI();
        log.info("?????? ?????? ????????? ????????? ?????? ?????? [{}]", requestURI);
        // ????????? ?????? ??????
        log.info("?????? ?????? ??????: JwtAuthorizationFilter [{}]", requestURI);
        // ?????? ?????? ??????
        try {
            if (isLoginCheckPath(requestURI)) {
                chain.doFilter(request, response);
                return;
            }
            // AccessToken ?????? ??????
            log.info("?????? ?????? ?????? ?????? [{}]", requestURI);
            String header = request.getHeader(JwtProperties.HEADER_STRING);
            if (!isValidateHeader(header)) {
                // Refresh Token ?????? ??????
                Cookie refreshTokenCookie = cookieUtil.getCookie(request, JwtProperties.REFRESH_HEADER_STRING);
                if (!isValidateCookie(refreshTokenCookie)) {
                    // Refresh Token ?????? ???
                    chain.doFilter(request, response);
                    return;
                }
                // Refresh Token ?????? ???
                log.info("RefreshToken ?????? [{}]", requestURI);
                String refreshToken = cookieUtil.exchangeToken(refreshTokenCookie).replace(JwtProperties.TOKEN_PREFIX, "");
                System.out.println("refreshToken = " + refreshToken);
                if (!jwtTokenUtil.isValidToken(TokenType.REFRESH_TOKEN, refreshToken)) {
                    // RefreshToken ????????? ??????
                    chain.doFilter(request, response);
                    return;
                }
                // RefreshToken ????????? ????????? ???
                reissueToken(request, response, refreshToken);
                chain.doFilter(request, response);
                return;
            }
            // AccessToken ????????? ?????? ??????
            String token = header.replace(JwtProperties.TOKEN_PREFIX, "");
            if (!jwtTokenUtil.isValidToken(TokenType.ACCESS_TOKEN, token)) {
                // AccessToken ????????? ?????? ??????
                chain.doFilter(request, response);
                return;
            }
            // AccessToken ????????? ?????? ??????
            // AccessToken ?????????
            Claims claimsFormToken = jwtTokenUtil.getClaimsFormToken(TokenType.ACCESS_TOKEN, token);
            Authentication authentication = getAuthentication(claimsFormToken.getSubject());
            if(authentication == null) {
                request.setAttribute("exception", "token");
                throw new JwtException("???????????? ?????? ???????????? ???????????????.");
            }
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            reissueAccessToken(request, response, principalDetails);
            // RefreshToken ???????????? ?????? ??? ?????????
            Cookie refreshTokenCookie = cookieUtil.getCookie(request, JwtProperties.REFRESH_HEADER_STRING);
            if (isValidateCookie(refreshTokenCookie)) {
                String refreshToken = cookieUtil.exchangeToken(refreshTokenCookie).replace(JwtProperties.TOKEN_PREFIX, "");
                if (jwtTokenUtil.isRefreshTokenExpireReissueTime(refreshToken)) {
                    if (isTokenEqualsRedisValue(request, response, refreshToken)) {
                        reissueRefreshToken(request, response, principalDetails);
                    }
                }
            }
            // ????????? ???????????? ????????? ??????
            setAuthentication(authentication);
            log.info("JwtAuthorizationFilter ?????? ?????? [{}]", requestURI);
            cookieUtil.addSameSite(response, "None");
            chain.doFilter(request, response);
        } catch (ServletException e) {
            log.error("ServletException : doFilterInternal()", e);
        } catch (IOException e) {
            log.error("IOException : doFilterInternal()", e);
        } catch (NullPointerException e) {
            log.error("NullPointerException : doFilterInternal()", e);
        }
    }

    private void reissueToken(HttpServletRequest request, HttpServletResponse response, String token) {
        // Redis??? ????????? ????????????, ????????? Ip???????
        try {
            if (!isTokenEqualsRedisValue(request, response, token)) return;
        } catch (NullPointerException e) {
            log.error("NullPointerException : isTokenEqualsRedisValue()", e);
            return;
        }
        // RefreshToken ????????? ??????
        log.info("?????? ????????? ?????? ?????? : reissueToken");
        // RefreshToken??? Claims(payload)?????? ?????????
        Claims refreshClaims = jwtTokenUtil.getClaimsFormToken(TokenType.REFRESH_TOKEN, token);
        String loginId = refreshClaims.get("sub").toString();
        // ???????????? ????????? ????????????
        Authentication authentication = getAuthentication(loginId);
        if (authentication == null) {
            cookieUtil.deleteCookie(response, JwtProperties.REFRESH_HEADER_STRING);
            request.setAttribute("exception", "loginId");
            throw new JwtException("???????????? ???????????? ????????????");
        }
        setAuthentication(authentication);
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        // AccessToken ?????? ??? ??????
        reissueAccessToken(request, response, principalDetails);
        // RefreshToken ???????????? ?????? ??? ?????????
        if (jwtTokenUtil.isRefreshTokenExpireReissueTime(token)) {
            // RefreshToken ?????? ??? ?????? ??????
            reissueRefreshToken(request, response, principalDetails);
            cookieUtil.addSameSite(response, "None");
        }
        log.info("?????? ????????? ?????? : AccessToken, RefreshToken [{}]", request.getRequestURI());
    }

    private boolean isTokenEqualsRedisValue(HttpServletRequest request, HttpServletResponse response, String token) {
        System.out.println("token = " + token);
        Object browserIp = redisTemplate.opsForValue().get(token);
        System.out.println("browserIp = " + browserIp);
        if (browserIp == null) {
            log.error("RefreshToken??? browserIp??? ??????????????????. : isTokenEqualsRedisValue()");
            cookieUtil.deleteCookie(response, JwtProperties.REFRESH_HEADER_STRING);
            request.setAttribute("exception", "refreshToken");
            throw new JwtException("???????????? ?????? ??????");
        }
        boolean checkIp = ClientUtil.getIp(request).equals(browserIp);
        if (checkIp) {
            log.info("RefreshToken??? browserIp??? ?????? [{}]", request.getRequestURI());
        } else {
            log.error("RefreshToken??? browserIp??? ???????????? ?????? [{}]", request.getRequestURI());
            deleteRedisKey(token);
        }
        return checkIp;
    }

    private void deleteRedisKey(String token) {
        redisTemplate.expire(token, 0, TimeUnit.SECONDS);
    }

    private void reissueAccessToken(HttpServletRequest request, HttpServletResponse response, PrincipalDetails principalDetails) {
        String accessToken = jwtTokenUtil.createJwtToken(principalDetails);
        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + accessToken);
        log.info("AccessToken ?????? ??? Header ?????? : reissueAccessToken()");
    }

    private void reissueRefreshToken(HttpServletRequest request, HttpServletResponse response, PrincipalDetails principalDetails) {
        String refreshToken = jwtTokenUtil.createRefreshToken(principalDetails);
        String browserIp = ClientUtil.getIp(request);
        saveRedis(refreshToken, browserIp, JwtProperties.REFRESH_EXPIRATION_TIME);
        Cookie refreshCookie = cookieUtil.createCookie(JwtProperties.REFRESH_HEADER_STRING, refreshToken);
        response.addCookie(refreshCookie);
        log.info("RefreshToken ?????? ??? Cookie ?????? : reissueRefreshToken()");
    }

    private void saveRedis(String key, String value, int expire) {
        redisTemplate.opsForValue().set(key, value);
        redisTemplate.expire(key, expire, TimeUnit.MILLISECONDS);
        log.info("Redis ?????? ?????? : Key = {} , Value = {}", key, value);
    }


    private void setAuthentication(Authentication authentication) {
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private Authentication getAuthentication(String loginId) {
        Optional<Member> memberEntity = memberRepository.findByLoginId(loginId);
        if (memberEntity.isPresent()) {
            PrincipalDetails principalDetails = new PrincipalDetails(memberEntity.get());
            log.info("DB ????????? ?????? : getAuthentication()");
            return new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
        }
        log.warn("DB ????????? ???????????? ?????? : getAuthentication");
        return null;
    }

    private boolean isValidateCookie(Cookie cookie) {
        boolean checkCookie = cookie != null;
        String result = checkCookie ? "?????? ????????? ?????? : RefreshToken ??????" : "????????? ????????? ?????? : RefreshToken ??????";
        log.info(result);
        return checkCookie;
    }

    private boolean isValidateHeader(String header) {
        boolean checkHeader = (header != null) && header.startsWith(JwtProperties.TOKEN_PREFIX);
        String result = checkHeader ? "?????? ????????? ?????? : AccessToken ??????" : "????????? ????????? ?????? : AccessToken ??????";
        log.info(result);
        return checkHeader;
    }


    private boolean isLoginCheckPath(String requestURI) {
        boolean checkPath = PatternMatchUtils.simpleMatch(whiteList, requestURI);
        String result = checkPath ? "????????? ?????? ?????? ?????? ?????? [{}]" : "????????? ????????? ?????? ?????? [{}]";
        log.info(result, requestURI);
        return checkPath;
    }
}
