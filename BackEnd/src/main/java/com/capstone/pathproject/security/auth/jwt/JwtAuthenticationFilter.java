package com.capstone.pathproject.security.auth.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.member.LoginRequestDTO;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("JwtAuthenticationFilter : 로그인시도");
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            LoginRequestDTO loginRequestDTO = objectMapper.readValue(request.getInputStream(), LoginRequestDTO.class);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(), loginRequestDTO.getPassword());
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            System.out.println("로그인 완료 : " + principalDetails.getMember().getLoginId());
            return authentication;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("successfulAuthentication 실행 : 인증 완료");
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
        String jwtToken = createJwtToken(principalDetails);
        String refreshToken = URLEncoder.encode(createRefreshToken(principalDetails), "utf-8");
        Cookie refreshCookie = new Cookie(JwtProperties.REFRESH_HEADER_STRING, URLEncoder.encode((JwtProperties.TOKEN_PREFIX + refreshToken), "utf-8"));
        System.out.println("refreshCookie = " + refreshCookie);
        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);
        response.addCookie(refreshCookie);
    }

    protected String createJwtToken(PrincipalDetails principalDetails) {
        return JWT.create()
                .withSubject(principalDetails.getUsername())
                .withHeader(createHeader("ACCESS_TOKEN"))
                .withClaim("payload", createClaims(principalDetails))
                .withExpiresAt(createExpireDate(JwtProperties.EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
    }

    protected String createRefreshToken(PrincipalDetails principalDetails) {
        return JWT.create()
                .withSubject(principalDetails.getUsername())
                .withHeader(createHeader("REFRESH_TOKEN"))
                .withClaim("payload", createClaims(principalDetails))
                .withExpiresAt(createExpireDate(JwtProperties.REFRESH_EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(JwtProperties.REFRESH));
    }

    private Map<String, Object> createHeader(String type) {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", type);
        header.put("alg", "HS512");
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    private Map<String, Object> createClaims(PrincipalDetails principalDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", principalDetails.getMember().getLoginId());
        claims.put("name", principalDetails.getMember().getName());
        return claims;
    }

    private Date createExpireDate(long expireDateTimeMillis) {
        return new Date(System.currentTimeMillis() + expireDateTimeMillis);
    }
}
