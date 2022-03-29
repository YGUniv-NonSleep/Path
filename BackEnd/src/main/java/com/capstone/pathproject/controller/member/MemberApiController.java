package com.capstone.pathproject.controller.member;

import com.capstone.pathproject.dto.member.MemberDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberApiController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity signup(@Valid @RequestBody MemberDTO memberDTO) {
        Message<MemberDTO> message = memberService.signup(memberDTO);
        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    @GetMapping("/test")
    public String test(Authentication authentication) {
        System.out.println("zzzzzz" + SecurityContextHolder.getContext().getAuthentication());
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        return "user";
    }

    // user, manager, admin 권한만 접근 가능
    @GetMapping("/user")
    public String user(Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
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
