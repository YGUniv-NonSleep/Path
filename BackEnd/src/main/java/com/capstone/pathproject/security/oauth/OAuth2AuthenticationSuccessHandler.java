package com.capstone.pathproject.security.oauth;

import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.security.auth.jwt.JwtProperties;
import com.capstone.pathproject.util.ClientUtil;
import com.capstone.pathproject.util.CookieUtil;
import com.capstone.pathproject.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final StringRedisTemplate redisTemplate;
    private final JwtTokenUtil jwtTokenUtil;
    private final CookieUtil cookieUtil;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        log.info("onAuthenticationSuccess : {}", "실행");
        // 1. 로그인 인증 완료
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        // 2. RefreshToken 생성
        String refreshToken = jwtTokenUtil.createRefreshToken(principalDetails);
        log.info("onAuthenticationSuccess : {}", "RefreshToken 생성");
        // 3. Redis 저장
        String browserIp = ClientUtil.getIp(request);
        saveRedis(refreshToken, browserIp, JwtProperties.REFRESH_EXPIRATION_TIME);
        // 4. RefreshTokenCookie 생성
        Cookie refreshCookie = cookieUtil.createCookie(JwtProperties.REFRESH_HEADER_STRING, refreshToken);
        // 5. RefreshToken은 쿠키에 설정
        response.addCookie(refreshCookie);
        // 6. UserId로 AccessToken 생성
        String jwtToken = jwtTokenUtil.createJwtToken(principalDetails);
        log.info("onAuthenticationSuccess : {}", "AccessToken 생성");
        // 7. AccessToken은 헤더로 , RefreshToken은 쿠키에 넣어서 로그인요청한 클라이언트에 응답
        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);
        cookieUtil.addSameSite(response, "None");

        log.info("onAuthenticationSuccess : {}", "완료");
        getRedirectStrategy().sendRedirect(request, response, "https://localhost:3000");
    }

    private void saveRedis(String key, String value, int expire) {
        redisTemplate.opsForValue().set(key, value);
        redisTemplate.expire(key, expire, TimeUnit.MILLISECONDS);
        log.info("Redis 저장 완료 : Key = {} , Value = {}", key, value);
    }
}
