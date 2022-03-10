package com.capstone.pathproject.service;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.MemberDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public ResponseEntity signup(MemberDTO memberDTO) {
        HttpHeaders headers = new HttpHeaders();
        String isEmptyMemberDTOResult = isEmptyMemberDTO(memberDTO);
        if (!isEmptyMemberDTOResult.equals("notEmpty")) {
            Message message = new Message(StatusEnum.BAD_REQUEST, isEmptyMemberDTOResult, memberDTO);
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        }
        Member member = memberDTO.toEntity();
        if (isValidateDuplicateMember(member)) {
            Message message = new Message(StatusEnum.BAD_REQUEST, "회원이 존재함", member);
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } else {
            memberRepository.save(member);
            Message message = new Message(StatusEnum.OK, "회원 가입 성공", member);
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        }
    }

    private String isEmptyMemberDTO(MemberDTO memberDTO) {
        if (memberDTO.getType() == null) return "Type 값이 비어있음";
        if (memberDTO.getLoginId().isEmpty()) return "loginId 값이 비어있음";
        if (memberDTO.getPassword().isEmpty()) return "password 값이 비어있음";
        if (memberDTO.getMail().isEmpty()) return "mail 값이 비어있음";
        if (memberDTO.getName().isEmpty()) return "name 값이 비어있음";
        if (memberDTO.getPhone().isEmpty()) return "phone 값이 비어있음";
        if (memberDTO.getAddr().isEmpty()) return "addr 값이 비어있음";
        if (memberDTO.getGender() == null) return "gender 값이 비어있음";
        if (memberDTO.getBirthday().isEmpty()) return "birthday 값이 비어있음";
        return "notEmpty";
    }

    private boolean isValidateDuplicateMember(Member member) {
        List<Member> findMembers = memberRepository.findByLoginId(member.getLoginId());
        return !findMembers.isEmpty();
    }
}
