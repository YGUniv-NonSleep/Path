package com.capstone.pathproject.controller.excpetion;

import com.capstone.pathproject.security.auth.jwt.JwtProperties;
import com.capstone.pathproject.util.CookieUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exception")
public class ExceptionApiController {

    private final CookieUtil cookieUtil;

    @GetMapping("/password")
    public void passwordValidException() {
        throw new BadCredentialsException("비밀번호가 일치하지 않습니다");
    }

    @GetMapping("/loginId")
    public void loginIdValidException() {
        throw new InternalAuthenticationServiceException("아이디가 존재하지 않습니다");
    }

    @GetMapping("/token")
    public void tokenValidException() {
        throw new AccountExpiredException("유효하지 않은 토큰입니다");
    }

    @DeleteMapping("/token")
    public ResponseEntity<Object> deleteTokenValidException(HttpServletResponse response) throws URISyntaxException {
        cookieUtil.deleteCookie(response, JwtProperties.REFRESH_HEADER_STRING);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(new URI("https://localhost:3000"));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @GetMapping("/expired")
    public ResponseEntity<Object> expiredJwtException(HttpServletResponse response) throws URISyntaxException {
        cookieUtil.deleteCookie(response, JwtProperties.REFRESH_HEADER_STRING);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(new URI("https://localhost:3000"));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }
}
