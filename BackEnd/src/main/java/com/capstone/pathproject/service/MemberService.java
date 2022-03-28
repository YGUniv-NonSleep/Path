package com.capstone.pathproject.service;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.MemberDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.controller.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public Message<MemberDTO> signup(MemberDTO memberDTO) {
        String isEmptyMemberDTOResult = isEmptyMemberDTO(memberDTO);
        if (!isEmptyMemberDTOResult.equals("notEmpty")) {
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message(isEmptyMemberDTOResult)
                    .body(memberDTO).build();
        }
        if (isValidateDuplicateMember(memberDTO)) {
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 존재함")
                    .body(memberDTO).build();
        } else {
            memberRepository.save(memberDTO.toEntity());
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.OK)
                    .message("회원 가입 성공")
                    .body(memberDTO).build();
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

    private boolean isValidateDuplicateMember(MemberDTO memberDTO) {
        List<Member> findMembers = memberRepository.findByLoginId(memberDTO.getLoginId());
        return !findMembers.isEmpty();
    }
}
