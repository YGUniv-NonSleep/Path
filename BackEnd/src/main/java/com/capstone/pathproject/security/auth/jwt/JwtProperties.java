package com.capstone.pathproject.security.auth.jwt;

public interface JwtProperties {
    String SECRET = "path_secret";
    int EXPIRATION_TIME = 10 * 60 * 1000; // 15분
    String HEADER_STRING = "Authorization";
    String TOKEN_PREFIX = "Bearer ";

    String REFRESH = "path_refresh";
    String REFRESH_HEADER_STRING = "RefreshToken";
    int REFRESH_EXPIRATION_TIME = 60 * 60 * 1000; // 1시간
//    int REFRESH_EXPIRATION_TIME = 24 * 60 * 60 * 1000;
}
