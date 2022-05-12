package com.capstone.pathproject.security.auth.jwt;

import com.capstone.pathproject.dto.member.LoginRequestDto;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.util.ClientUtil;
import com.capstone.pathproject.util.CookieUtil;
import com.capstone.pathproject.util.JwtTokenUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final StringRedisTemplate redisTemplate;
    private final JwtTokenUtil jwtTokenUtil;
    private final CookieUtil cookieUtil;


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        String requestURI = request.getRequestURI();
        log.info("로그인 시도 : JwtAuthenticationFilter [{}]", requestURI);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            LoginRequestDto loginRequestDTO = objectMapper.readValue(request.getInputStream(), LoginRequestDto.class);
            log.info("UsernamePasswordAuthenticationToken 생성 [{}]", requestURI);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(), loginRequestDTO.getPassword());
            System.out.println("authenticationToken = " + authenticationToken);
            log.info("DB 사용자 조회 : PrincipalDetailsService.loadUserByUsername() 실행 [{}]", requestURI);
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            log.info("DB 사용자 인증 완료 : {} [{}]", principalDetails.getMember().getLoginId(), requestURI);
            return authentication;
        } catch (IOException e) {
            log.error("입출력 실패 : attemptAuthentication()", e);
            e.printStackTrace();
        } catch (BadCredentialsException e) {
            log.error("자격 증명 실패 : attemptAuthentication()", e);
            request.setAttribute("exception", "password");
            throw new JwtException("비밀번호가 일치하지 않습니다");
        } catch (InternalAuthenticationServiceException e) {
            log.error("인증 요청에 대한 처리 실패 | 아아디 존재하지 않음", e);
            request.setAttribute("exception", "loginId");
            throw new JwtException("아이디가 존재하지 않습니다");
        } catch (AuthenticationException e) {
            log.error("인증 예외 발생", e);
        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) {
        String requestURI = request.getRequestURI();
        // ==서버== //
        // 1. 로그인 인증 완료
        log.info("successfulAuthentication 실행 [{}]", requestURI);
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
        // 2. RefreshToken 생성 (만료시간 길게)
        String refreshToken = jwtTokenUtil.createRefreshToken(principalDetails);
        log.info("RefreshToken 생성 [{}]", requestURI);
        // 3. DB나 메모리DB(Redis)에 key-value 처럼 저장하는데 key = RefreshToken , value = browserIp 저장
        String browserIp = ClientUtil.getIp(request);
        saveRedis(refreshToken, browserIp, JwtProperties.REFRESH_EXPIRATION_TIME);
        // 4. RefreshTokenCookie 생성
        Cookie refreshCookie = cookieUtil.createCookie(JwtProperties.REFRESH_HEADER_STRING, refreshToken);
        log.info("Cookie 생성 : RefreshToken -> RefreshTokenCookie [{}]", requestURI);
        // 5. RefreshToken은 쿠키에 설정
        response.addCookie(refreshCookie);
        log.info("Response Cookie 추가 : RefreshTokenCookie [{}]", requestURI);
        // 6. UserId로 AccessToken 생성
        String jwtToken = jwtTokenUtil.createJwtToken(principalDetails);
        log.info("AccessToken 생성 [{}]", requestURI);
        // 7. AccessToken은 헤더로 , RefreshToken은 쿠키에 넣어서 로그인요청한 클라이언트에 응답
        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);
        cookieUtil.addSameSite(response, "None");
        log.info("Response Header 추가 : AccessToken [{}]", requestURI);
        log.info("Response 완료 [{}]", requestURI);
        // ==클라이언트== //
        // 1. AccessToken은 브라우저 상의 private 변수로만 저장하여 사용
        // 2. RefreshToken은 브라우저 쿠키 저장소에 저장됨.
        // 3. 매 요청시 쿠키에 RefreshToken이 전달되는데 쿠키는 httpOnly와 secure 옵션 만들면 탈취안되도록 방어가능
        //   그래도 혹시몰라 요청하는 브라우저 ip를 검사하는 것
        // 4. SPA로 동작하면 새로고침될 때마다 AccessToken 없어져서 RefreshToken으로 매번 재발급해야함. (Redis쓰면 서버 부하 분산)
        //    => 매번 새로고침해서 토큰 재발급에 대한건 좀 더 고민이 필요
    }

    private void saveRedis(String key, String value, int expire) {
        redisTemplate.opsForValue().set(key, value);
        redisTemplate.expire(key, expire, TimeUnit.MILLISECONDS);
        log.info("Redis 저장 완료 : Key = {} , Value = {}", key, value);
    }
}
