package com.capstone.pathproject.controller;

import com.capstone.pathproject.domain.member.memberGender;
import com.capstone.pathproject.dto.member.MemberDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.member.MemberService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;


@AutoConfigureMockMvc
@SpringBootTest
@Transactional
class MemberApiControllerTest {

    @Autowired
    private MemberService memberService;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void signup_null값_경로테스트() throws Exception {
        //given
        MemberDTO memberDTO = MemberDTO.createMemberDTO().build();
        String content = objectMapper.writeValueAsString(memberDTO);
        //when
        mockMvc.perform(MockMvcRequestBuilders.post("/api/signup")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    }

    @Test
    void signup_필수값_경로테스트() throws Exception {
        //given
        MemberDTO memberDTO = setAllMemberDTO();
        String content = objectMapper.writeValueAsString(memberDTO);
        //when
        mockMvc.perform(MockMvcRequestBuilders.post("/api/signup")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void signup_정상작동() throws Exception {
        //given
        MemberDTO memberDTO = setAllMemberDTO();
        //when
        Message<String> message = memberService.signup(memberDTO);
        //then
        ResponseEntity<Message<String>> response = new ResponseEntity<Message<String>>(message, HttpStatus.OK);
        System.out.println("header : " + response.getBody().getHeader().toString());
        System.out.println("message : " + response.getBody().getMessage());
        System.out.println("body : " + response.getBody().getBody().toString());
    }

    private MemberDTO setAllMemberDTO() {
        return MemberDTO.createMemberDTO()
                .loginId("로그인아이디")
                .password("패스워드")
                .mail("member@naver.com")
                .name("이름")
                .phone("010-1234-5678")
                .addr("대구시 동구 산격동")
                .addrDetail("1111")
                .gender(memberGender.MALE)
                .birthday(LocalDate.parse("2000-01-01"))
                .build();
    }
}