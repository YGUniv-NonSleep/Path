package com.capstone.pathproject.controller;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.MemberDTO;
import com.capstone.pathproject.service.MemberService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class MemberApiControllerTest {

    @Autowired
    MemberService memberService;

    @Test
    void signupTest() throws Exception {
        //given
        Member member = MemberDTO.createMemberDTO()
                .loginId("테스트아이디1")
                .birthday("2000-02-22")
                .build().toEntity();
        //when
        Long signup = memberService.signup(member);
        //then
        System.out.println("회원가입 완료 " + signup);
        System.out.println("========================");
        System.out.println(member.toString());
    }
}