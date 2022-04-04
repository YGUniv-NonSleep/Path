package com.capstone.pathproject.security.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.security.auth.jwt.JwtProperties;
import com.capstone.pathproject.security.auth.jwt.TokenType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class JwtTokenUtil {

    // AccessToken 생성
    public String createJwtToken(PrincipalDetails principalDetails) {
        return JWT.create()
                .withSubject(principalDetails.getUsername())
                .withHeader(createHeader("ACCESS_TOKEN"))
                .withClaim("id", principalDetails.getMember().getId())
                .withClaim("name", principalDetails.getMember().getName())
                .withExpiresAt(createExpireDate(JwtProperties.EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
    }

    // RefreshToken 생성
    public String createRefreshToken(PrincipalDetails principalDetails) {
        return JWT.create()
                .withSubject(principalDetails.getUsername())
                .withHeader(createHeader("REFRESH_TOKEN"))
                .withClaim("id", principalDetails.getMember().getId())
                .withClaim("name", principalDetails.getMember().getName())
                .withExpiresAt(createExpireDate(JwtProperties.REFRESH_EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(JwtProperties.REFRESH));
    }

    // Token Header 생성
    public Map<String, Object> createHeader(String type) {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", type);
        header.put("alg", "HS512");
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    // 만료시간 생성
    public Date createExpireDate(long expireDateTimeMillis) {
        return new Date(System.currentTimeMillis() + expireDateTimeMillis);
    }

    // 토큰 유효성 검사
    public boolean isValidToken(TokenType tokenType, String token) {
        log.info("토큰 유효성 검사 실행 : isValidToken");
        try {
            Claims accessClaims = getClaimsFormToken(tokenType, token);
            log.info("LoginId : {}", accessClaims.getSubject());
            log.info("expireTime : {}", accessClaims.getExpiration());
            log.info("토큰 유효성 검사 성공 : true");
            return true;
        } catch (ExpiredJwtException exception) {
            log.error("토큰 유효 기간 만료 : {}", exception.getClaims().getExpiration());
            log.error("토큰 유효성 검사 실패 : false", exception);
            return false;
        } catch (JwtException exception) {
            log.error("토큰 예외 발생 : {}", exception.getMessage());
            log.error("토큰 유효성 검사 실패 : false", exception);
            return false;
        } catch (NullPointerException exception) {
            log.error("토큰 NullPointer 발생 : {}", exception.getMessage());
            log.error("토큰 유효성 검사 실패 : false", exception);
            return false;
        }
    }

    // 토큰에 담긴 payload 값 가져오기
    public Claims getClaimsFormToken(TokenType tokenType, String token) {
        if (tokenType == TokenType.ACCESS_TOKEN) {
            return Jwts.parser()
                    .setSigningKey(JwtProperties.SECRET.getBytes(StandardCharsets.UTF_8))
                    .parseClaimsJws(token)
                    .getBody();
        } else {
            return Jwts.parser()
                    .setSigningKey(JwtProperties.REFRESH.getBytes(StandardCharsets.UTF_8))
                    .parseClaimsJws(token)
                    .getBody();
        }
    }

    public boolean isRefreshTokenExpireReissueTime(String refreshToken) {
        Claims claimsFormToken = getClaimsFormToken(TokenType.REFRESH_TOKEN, refreshToken);
        long expiration = claimsFormToken.getExpiration().getTime();
        long now = new Date().getTime();
        if (expiration >= now && expiration - 600000 <= now) {
            log.info("RefreshToken 갱신 필요 : {}", expiration);
            return true;
        }
        log.info("RefreshToken 갱신 불필요 : {}", expiration);
        return false;
    }
}
