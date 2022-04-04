package com.capstone.pathproject.security.auth.jwt;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.security.util.ClientUtil;
import com.capstone.pathproject.security.util.CookieUtil;
import com.capstone.pathproject.security.util.JwtTokenUtil;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
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
import java.util.Collection;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private final MemberRepository memberRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final JwtTokenUtil jwtTokenUtil;
    private final CookieUtil cookieUtil;
    private static final String[] whiteList = {"/", "/login", "/logout", "/api/signup"};

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, MemberRepository memberRepository, RedisTemplate redisTemplate, JwtTokenUtil jwtTokenUtil, CookieUtil cookieUtil) {
        super(authenticationManager);
        this.memberRepository = memberRepository;
        this.redisTemplate = redisTemplate;
        this.jwtTokenUtil = jwtTokenUtil;
        this.cookieUtil = cookieUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) {
        String requestURI = request.getRequestURI();
        log.info("인증 또는 권한이 필요한 주소 요청 [{}]", requestURI);
        // 사용자 인증 시작
        log.info("인증 필터 시작: JwtAuthorizationFilter [{}]", requestURI);
        // 인증 경로 검사
        try {
            if (isLoginCheckPath(requestURI)) {
                chain.doFilter(request, response);
                return;
            }
            // AccessToken 여부 체크
            log.info("인증 체크 로직 실행 [{}]", requestURI);
            String header = request.getHeader(JwtProperties.HEADER_STRING);
            if (!isValidateHeader(header)) {
                // Refresh Token 검증 실시
                Cookie refreshTokenCookie = cookieUtil.getCookie(request, JwtProperties.REFRESH_HEADER_STRING);
                if (!isValidateCookie(refreshTokenCookie)) {
                    // Refresh Token 없을 때
                    chain.doFilter(request, response);
                    return;
                }
                // Refresh Token 있을 때
                log.info("RefreshToken 조회 [{}]", requestURI);
                String refreshToken = cookieUtil.exchangeToken(refreshTokenCookie).replace(JwtProperties.TOKEN_PREFIX, "");
                if (!jwtTokenUtil.isValidToken(TokenType.REFRESH_TOKEN, refreshToken)) {
                    // RefreshToken 유효성 실패
                    chain.doFilter(request, response);
                    return;
                }
                // RefreshToken 유효성 성공할 때
                reissueToken(request, response, refreshToken);
                chain.doFilter(request, response);
                return;
            }
            // AccessToken 있으니 검증 실시
            String token = header.replace(JwtProperties.TOKEN_PREFIX, "");
            if (!jwtTokenUtil.isValidToken(TokenType.ACCESS_TOKEN, token)) {
                // AccessToken 유효성 검사 실패
                chain.doFilter(request, response);
                return;
            }
            // AccessToken 유효성 검사 성공
            // AccessToken 재발급
            Claims claimsFormToken = jwtTokenUtil.getClaimsFormToken(TokenType.ACCESS_TOKEN, token);
            Authentication authentication = getAuthentication(claimsFormToken.getSubject());
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            reissueAccessToken(request, response, principalDetails);
            // RefreshToken 만료시간 확인 후 재발급
            Cookie refreshTokenCookie = cookieUtil.getCookie(request, JwtProperties.REFRESH_HEADER_STRING);
            if (isValidateCookie(refreshTokenCookie)) {
                String refreshToken = cookieUtil.exchangeToken(refreshTokenCookie).replace(JwtProperties.TOKEN_PREFIX, "");
                if (jwtTokenUtil.isRefreshTokenExpireReissueTime(refreshToken)) {
                    if (isTokenEqualsRedisValue(request, token)) {
                        reissueRefreshToken(request, response, principalDetails);
                    }
                }
            }
            // 스프링 시큐리티 세션에 저장
            setAuthentication(authentication);
            log.info("JwtAuthorizationFilter 실행 종료 [{}]", requestURI);
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
        // Redis에 키값이 들어있고, 동일한 Ip인가?
        try {
            if (!isTokenEqualsRedisValue(request, token)) return;
        } catch (NullPointerException e) {
            log.error("NullPointerException : isTokenEqualsRedisValue()", e);
            return;
        }
        // RefreshToken 재발급 시작
        log.info("토큰 재발급 로직 실행 : reissueToken");
        // RefreshToken의 Claims(payload)부분 꺼내기
        Claims refreshClaims = jwtTokenUtil.getClaimsFormToken(TokenType.REFRESH_TOKEN, token);
        String loginId = refreshClaims.get("sub").toString();
        // 시큐리티 세션에 저장하기
        Authentication authentication = getAuthentication(loginId);
        setAuthentication(authentication);
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        // AccessToken 생성 및 추가
        reissueAccessToken(request, response, principalDetails);
        // RefreshToken 생성 및 쿠키 추가
        reissueRefreshToken(request, response, principalDetails);
        log.info("토큰 재발급 완료 : AccessToken, RefreshToken [{}]", request.getRequestURI());
    }

    private boolean isTokenEqualsRedisValue(HttpServletRequest request, String token) {
        String browserIp = (String) redisTemplate.opsForValue().get(token);
        if (browserIp.isEmpty()) {
            log.error("RefreshToken의 browserIp가 비어있습니다. : isTokenEqualsRedisValue()");
            return false;
        }
        boolean checkIp = ClientUtil.getIp(request).equals(browserIp);
        String result = checkIp ? "RefreshToken의 browserIp가 동일 [{}]" : "RefreshToken의 browserIp가 동일하지 않음 [{}]";
        log.info(result, request.getRequestURI());
        deleteRedisKey(token);
        return checkIp;
    }

    private void deleteRedisKey(String token) {
        redisTemplate.expire(token, 0, TimeUnit.SECONDS);
    }

    private void reissueAccessToken(HttpServletRequest request, HttpServletResponse response, PrincipalDetails principalDetails) {
        String accessToken = jwtTokenUtil.createJwtToken(principalDetails);
        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + accessToken);
        log.info("AccessToken 발급 및 Header 추가 : reissueAccessToken()");
    }

    private void reissueRefreshToken(HttpServletRequest request, HttpServletResponse response, PrincipalDetails principalDetails) {
        String refreshToken = jwtTokenUtil.createRefreshToken(principalDetails);
        String browserIp = ClientUtil.getIp(request);
        saveRedis(refreshToken, browserIp, JwtProperties.REFRESH_EXPIRATION_TIME);
        Cookie refreshCookie = cookieUtil.createCookie(JwtProperties.REFRESH_HEADER_STRING, refreshToken);
        response.addCookie(refreshCookie);
        log.info("RefreshToken 발급 및 Cookie 추가 : reissueRefreshToken()");
    }

    private void saveRedis(String key, String value, int expire) {
        redisTemplate.opsForValue().set(key, value);
        redisTemplate.expire(key, expire, TimeUnit.MILLISECONDS);
        log.info("Redis 저장 완료 : Key = {} , Value = {}", key, value);
    }


    private void setAuthentication(Authentication authentication) {
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private Authentication getAuthentication(String loginId) {
        Optional<Member> memberEntity = memberRepository.findByLoginId(loginId);
        if (memberEntity.isPresent()) {
            PrincipalDetails principalDetails = new PrincipalDetails(memberEntity.get());
            log.info("DB 사용자 존재 : getAuthentication()");
            return new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
        }
        log.warn("DB 사용자 존재하지 않음 : getAuthentication");
        return null;
    }

    private boolean isValidateCookie(Cookie cookie) {
        boolean checkCookie = cookie != null;
        String result = checkCookie ? "인증 사용자 요청 : RefreshToken 있음" : "미인증 사용자 요청 : RefreshToken 없음";
        log.info(result);
        return checkCookie;
    }

    private boolean isValidateHeader(String header) {
        boolean checkHeader = (header != null) && header.startsWith(JwtProperties.TOKEN_PREFIX);
        String result = checkHeader ? "인증 사용자 요청 : AccessToken 있음" : "미인증 사용자 요청 : AccessToken 없음";
        log.info(result);
        return checkHeader;
    }


    private boolean isLoginCheckPath(String requestURI) {
        boolean checkPath = PatternMatchUtils.simpleMatch(whiteList, requestURI);
        String result = checkPath ? "인증이 필요 없는 주소 요청 [{}]" : "인증이 필요한 주소 요청 [{}]";
        log.info(result, requestURI);
        return checkPath;
    }
}
