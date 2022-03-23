package com.capstone.pathproject.controller.member;

import com.capstone.pathproject.dto.member.MemberDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

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

    // user, manager, admin 권한만 접근 가능
    @GetMapping("/user")
    public String user(Authentication authentication) {
        System.out.println("dddddddd : " + authentication);
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("authentication = " + principalDetails.getUsername());
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
