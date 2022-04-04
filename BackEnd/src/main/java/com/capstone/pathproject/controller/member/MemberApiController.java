package com.capstone.pathproject.controller.member;

import com.capstone.pathproject.dto.member.MemberDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberApiController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity signup(@Valid @RequestBody MemberDTO memberDTO) {
        Message<MemberDTO> message = memberService.signup(memberDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/test")
    public String test(HttpServletResponse response) {
        Cookie cookie = new Cookie("name", "value");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);
        Collection<String> headers = response.getHeaders(HttpHeaders.SET_COOKIE);
        for (String header : headers) {
            response.setHeader(HttpHeaders.SET_COOKIE, String.format("%s; Secure; %s", header, "SameSite=" + "None"));
        }
        return "user";
    }

    @PostMapping("/member/test")
    public String memberTest(Authentication authentication, HttpServletResponse response) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("principalDetails = " + principalDetails);
        Collection<String> headers = response.getHeaders(HttpHeaders.SET_COOKIE);
        System.out.println("headers = " + headers.isEmpty());
        System.out.println("headers = " + headers);
        for (String header: headers) {
            System.out.println(header);
        }
        return "memberTest";
    }

    // user, manager, admin 권한만 접근 가능
    @GetMapping("/user")
    public String user(Authentication authentication, HttpServletResponse response) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("principalDetails = " + principalDetails);
        Collection<String> headers = response.getHeaders(HttpHeaders.SET_COOKIE);
        System.out.println("headers = " + headers.isEmpty());
        System.out.println("headers = " + headers);
        for (String header: headers) {
            System.out.println(header);
        }
        return "user";
    }

    // manager, admin 권한만 접근 가능
    @GetMapping("/business")
    public String manager() {
        return "manager";
    }

    // admin 권한만 접근 가능
    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }

}
