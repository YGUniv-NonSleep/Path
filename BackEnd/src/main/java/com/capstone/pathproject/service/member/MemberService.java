package com.capstone.pathproject.service.member;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.Role;
import com.capstone.pathproject.dto.member.MemberDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    public Message<MemberDTO> signup(MemberDTO memberDTO) {
        if (isValidateDuplicateMember(memberDTO)) {
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 존재함")
                    .body(memberDTO).build();
        }
        memberDTO.changeMemberRole(Role.ROLE_MEMBER);
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

    @Transactional(readOnly = true)
    public Message<MemberDTO> getMemberInfo(Long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        Member memberEntity = member.orElse(null);
        if (memberEntity == null) {
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 없습니다.")
                    .body(null).build();
        } else {
            MemberDTO memberDTO = MemberDTO.createMemberDTO()
                    .id(memberEntity.getId())
                    .mail(memberEntity.getMail())
                    .name((memberEntity.getName()))
                    .phone(memberEntity.getPhone())
                    .addr(memberEntity.getAddr())
                    .addrDetail(memberEntity.getAddrDetail())
                    .account(memberEntity.getAccount())
                    .score(memberEntity.getScore()).build();
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.OK)
                    .message("회원이 있습니다.")
                    .body(memberDTO).build();
        }

    }


    public Message<MemberDTO> updateMember(Long id, MemberDTO memberDTO) {
        Optional<Member> member = memberRepository.findById(id);
        Member memberEntity = member.orElse(null);
        if (memberEntity == null) {
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 없습니다.")
                    .body(null).build();
        } else {
            if (StringUtils.isNotBlank(memberDTO.getMail())) memberEntity.updateMail(memberDTO.getMail());
            if (StringUtils.isNotBlank(memberDTO.getPhone())) memberEntity.updatePhone(memberDTO.getPhone());
            if (StringUtils.isNotBlank(memberDTO.getAddr())) memberEntity.updateAddr(memberDTO.getAddr());
            if (StringUtils.isNotBlank(memberDTO.getAddrDetail()))
                memberEntity.updateAddrDetail(memberDTO.getAddrDetail());
            MemberDTO newMemberDTO = MemberDTO.createMemberDTO()
                    .id(memberEntity.getId())
                    .mail(memberEntity.getMail())
                    .name((memberEntity.getName()))
                    .phone(memberEntity.getPhone())
                    .addr(memberEntity.getAddr())
                    .addrDetail(memberEntity.getAddrDetail())
                    .account(memberEntity.getAccount())
                    .score(memberEntity.getScore()).build();
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.OK)
                    .message("회원 수정이 되었습니다.")
                    .body(newMemberDTO).build();
        }

    }


    public Message<MemberDTO> deleteMember(Long id) {
        Optional<Member> member = memberRepository.findById(id);
        Member memberEntity = member.orElse(null);
        if (memberEntity == null) {
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 없습니다.")
                    .body(null).build();
        } else {
            memberRepository.delete(memberEntity);
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.OK)
                    .message("회원 탈퇴하였습니다.")
                    .build();
        }
    }
}
