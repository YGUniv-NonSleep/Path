package com.capstone.pathproject.controller;

import com.capstone.pathproject.domain.member.memberGender;
import com.capstone.pathproject.domain.member.memberType;
import com.capstone.pathproject.dto.MemberDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.service.MemberService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class MemberApiControllerTest {

    @Autowired
    private MemberService memberService;

    @Test
    void signup_빈객체_테스트() throws Exception {
        //given
        MemberDTO memberDTO = MemberDTO.createMemberDTO().build();
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;
        //when
        Message<MemberDTO> message = memberService.signup(memberDTO);
        if (message.getHeader() == StatusEnum.BAD_REQUEST) status = HttpStatus.BAD_REQUEST;
        else if (message.getHeader() == StatusEnum.NOT_FOUND) status = HttpStatus.NOT_FOUND;
        else if (message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR) status = HttpStatus.INTERNAL_SERVER_ERROR;
        //then
        ResponseEntity<Message<MemberDTO>> response = new ResponseEntity<>(message, headers, status);
        System.out.println(response.getStatusCode());
        System.out.println(response.getBody().getMessage());
        System.out.println(response.getBody().getBody().toString());
    }

    @Test
    void signup_필수값_객체_테스트() throws Exception {
        //given
        MemberDTO memberDTO = MemberDTO.createMemberDTO()
                .type(memberType.USER)
                .loginId("로그인아이디")
                .password("패스워드")
                .mail("member@naver.com")
                .name("이름")
                .phone("010-1234-5678")
                .addr("대구시 동구 산격동")
                .gender(memberGender.MALE)
                .birthday("2000-01-01")
                .build();
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;
        //when
        Message<MemberDTO> message = memberService.signup(memberDTO);
        if (message.getHeader() == StatusEnum.BAD_REQUEST) status = HttpStatus.BAD_REQUEST;
        else if (message.getHeader() == StatusEnum.NOT_FOUND) status = HttpStatus.NOT_FOUND;
        else if (message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR) status = HttpStatus.INTERNAL_SERVER_ERROR;
        //then
        ResponseEntity<Message<MemberDTO>> response = new ResponseEntity<>(message, headers, status);
        System.out.println(response.getStatusCode());
        System.out.println(response.getBody().getMessage());
        System.out.println(response.getBody().getBody().toString());
    }
}