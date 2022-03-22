package com.capstone.pathproject.security.auth.jwt;

public interface JwtProperties {
    String SECRET = "path_secret";
    int EXPIRATION_TIME = 60000*10;
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
