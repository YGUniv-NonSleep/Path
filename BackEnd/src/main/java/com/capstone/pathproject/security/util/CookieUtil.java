package com.capstone.pathproject.security.util;

import com.capstone.pathproject.security.auth.jwt.JwtProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

@Slf4j
@Component
public class CookieUtil {

    public Cookie createCookie(String cookieName, String value) {
        Cookie refreshCookie = null;
        try {
            refreshCookie = new Cookie(cookieName, URLEncoder.encode((JwtProperties.TOKEN_PREFIX + value), "utf-8"));
        } catch (UnsupportedEncodingException e) {
            log.error("UnsupportedEncodingException : createCookie()", e);
        }
        refreshCookie.setMaxAge(JwtProperties.REFRESH_EXPIRATION_TIME / 1000); // 24시간
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(true);
        refreshCookie.setPath("/"); // 모든 경로에서 접근 가능
        return refreshCookie;
    }

    public Cookie getCookie(HttpServletRequest request, String cookieName) {
        final Cookie[] cookies = request.getCookies();
        if (cookies == null) return null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(cookieName))
                return cookie;
        }
        return null;
    }

    public String exchangeToken(Cookie cookie) {
        try {
            return URLDecoder.decode(cookie.getValue(), "utf-8");
        } catch (UnsupportedEncodingException e) {
            log.error("UnsupportedEncodingException : exchangeToken", e);
            return null;
        }
    }
}
