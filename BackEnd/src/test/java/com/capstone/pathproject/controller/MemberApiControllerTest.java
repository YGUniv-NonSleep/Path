package com.capstone.pathproject.controller;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.Role;
import com.capstone.pathproject.domain.member.MemberGender;
import com.capstone.pathproject.dto.member.MemberDTO;
import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.service.member.MemberService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
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
    private MemberRepository memberRepository;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    private Member createMember(int num) {
        return Member.createMember()
                .role(Role.ROLE_MEMBER)
                .loginId("로그인아이디")
                .password("패스워드")
                .mail("member@naver.com")
                .name("이름")
                .phone("010-1234-5678")
                .postId(41111)
                .addr("대구시 동구 산격로")
                .addrDetail("1111")
                .addrExtra("산격동")
                .gender(MemberGender.MALE)
                .birthday(LocalDate.parse("2000-01-01"))
                .account("계좌")
                .score(100)
                .build();
    }

    private MemberDTO setAllMemberDTO() {
        return MemberDTO.createMemberDTO()
                .role(Role.ROLE_MEMBER)
                .loginId("로그인아이디")
                .password("패스워드")
                .mail("member@naver.com")
                .name("이름")
                .phone("010-1234-5678")
                .postId(41111)
                .addr("대구시 동구 산격로")
                .addrDetail("1111")
                .addrExtra("산격동")
                .gender(MemberGender.MALE)
                .birthday(LocalDate.parse("2000-01-01"))
                .account("계좌")
                .score(100)
                .build();
    }

    @Test
    void 회원가입_null값() throws Exception {
        //given
        MemberDTO memberDTO = MemberDTO.createMemberDTO().build();
        String content = objectMapper.writeValueAsString(memberDTO);
        //when
        mockMvc.perform(MockMvcRequestBuilders.post("/api/member")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    }

    @Test
    void 회원가입() throws Exception {
        //given
        MemberDTO memberDTO = setAllMemberDTO();
        String content = objectMapper.writeValueAsString(memberDTO);
        //when
        mockMvc.perform(MockMvcRequestBuilders.post("/api/member")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }
}