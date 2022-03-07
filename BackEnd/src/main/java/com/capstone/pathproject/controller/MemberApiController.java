package com.capstone.pathproject.controller;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.memberGender;
import com.capstone.pathproject.domain.member.memberType;
import com.capstone.pathproject.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public String signup(@RequestParam("type") memberType type,
                         @RequestParam("loginId") String loginId,
                         @RequestParam("password") String password,
                         @RequestParam("mail") String mail,
                         @RequestParam("name") String name,
                         @RequestParam("phone") String phone,
                         @RequestParam("addr") String addr,
                         @RequestParam("addrDetail") String addrDetail,
                         @RequestParam("gender") memberGender gender,
                         @RequestParam("birthday") String birthday,
                         @RequestParam("account") String account) {
        Member member = Member.createUser(type, loginId, password, mail, name, phone, addr, addrDetail, gender, birthday, account);
        memberService.signup(member);
        System.out.println("회원가입 완료");
        return "회원가입 완료";
    }
}
