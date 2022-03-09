package com.capstone.pathproject.controller;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.MemberDTO;
import com.capstone.pathproject.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public String signup(MemberDTO memberDTO) {
        Member member = memberDTO.toEntity();
        memberService.signup(member);
        System.out.println("회원가입 완료");
        System.out.println(member.toString());
        return "회원가입 완료";
    }
}
