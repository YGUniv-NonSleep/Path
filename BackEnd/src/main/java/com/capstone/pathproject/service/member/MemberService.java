package com.capstone.pathproject.service.member;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.Role;
import com.capstone.pathproject.dto.member.MemberDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.member.MemberRepository;
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
        if (isValidateDuplicateMember(memberDTO)) {
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 존재함")
                    .body(memberDTO).build();
        }
        memberDTO.updateMemberRole(Role.ROLE_MEMBER);
        memberDTO.encodePassword(bCryptPasswordEncoder.encode(memberDTO.getPassword()));
        memberRepository.save(memberDTO.toEntity());
        return Message.<MemberDTO>createMessage()
                .header(StatusEnum.OK)
                .message("회원 가입 성공")
                .body(memberDTO).build();

    }

    private boolean isValidateDuplicateMember(MemberDTO memberDTO) {
        Optional<Member> findMembers = memberRepository.findByLoginId(memberDTO.getLoginId());
        return findMembers.isPresent();
    }
}
