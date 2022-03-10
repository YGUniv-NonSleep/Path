package com.capstone.pathproject.controller;

import com.capstone.pathproject.dto.MemberDTO;
import com.capstone.pathproject.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity signup(MemberDTO memberDTO) {
        return memberService.signup(memberDTO);
    }
}
