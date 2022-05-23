package com.capstone.pathproject.security.filter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Order(1)
@Component
public class JwtExceptionFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            log.info("JwtExceptionFilter 실행");
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            response.sendRedirect("/exception/expired");
        } catch (JwtException e) {
            String exception = (String) request.getAttribute("exception");
            if (exception.equals("password"))
                response.sendRedirect("/exception/password");
            else if (exception.equals("loginId"))
                response.sendRedirect("/exception/loginId");
            else if (exception.equals("refreshToken"))
                response.sendRedirect("/exception/refreshToken");
        }
        log.info("JwtExceptionFilter 실행 끝");
    }

}
