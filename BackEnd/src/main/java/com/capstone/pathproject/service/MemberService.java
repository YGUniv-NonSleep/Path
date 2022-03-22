package com.capstone.pathproject.service;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.Role;
import com.capstone.pathproject.dto.member.MemberDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

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
            memberDTO.updateMemberRole(Role.ROLE_USER);
            memberDTO.encodePassword(bCryptPasswordEncoder.encode(memberDTO.getPassword()));
            memberRepository.save(memberDTO.toEntity());
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.OK)
                    .message("회원 가입 성공")
                    .body(memberDTO).build();
        }
    }

    private String isEmptyMemberDTO(MemberDTO memberDTO) {
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
        Optional<Member> findMembers = memberRepository.findByLoginId(memberDTO.getLoginId());
        return findMembers.isPresent();
    }
}
