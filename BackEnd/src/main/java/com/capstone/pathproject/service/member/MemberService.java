package com.capstone.pathproject.service.member;

import com.capstone.pathproject.domain.member.Member;
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
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // 회원가입
    public Message<String> signup(MemberDTO memberDTO) {
        if (isValidateDuplicateMember(memberDTO)) {
            return Message.<String>createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 존재함")
                    .body(memberDTO.getLoginId()).build();
        }
        memberDTO.changeScore(100);
        memberDTO.changePassword(encodePassword(memberDTO.getPassword()));
        memberRepository.save(memberDTO.toEntity());
        return Message.<String>createMessage()
                .header(StatusEnum.OK)
                .message("회원 가입 성공")
                .body(memberDTO.getLoginId()).build();
    }

    private boolean isValidateDuplicateMember(MemberDTO memberDTO) {
        Optional<Member> findMembers = memberRepository.findByLoginId(memberDTO.getLoginId());
        return findMembers.isPresent();
    }

    private String encodePassword(String password) {
        return bCryptPasswordEncoder.encode(password);
    }

    // 회원 조회
    @Transactional(readOnly = true)
    public Message<MemberDTO> getMemberInfo(Long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        Member memberEntity = member.orElse(null);
        if (memberEntity == null) {
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 없습니다.").build();
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

    // 회원 수정
    public Message<MemberDTO> updateMember(Long id, MemberDTO memberDTO) {
        Optional<Member> member = memberRepository.findById(id);
        Member memberEntity = member.orElse(null);
        if (memberEntity == null) {
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 없습니다.").build();
        } else {
            if (StringUtils.isNotBlank(memberDTO.getMail())) memberEntity.updateMail(memberDTO.getMail());
            if (StringUtils.isNotBlank(memberDTO.getPhone())) memberEntity.updatePhone(memberDTO.getPhone());
            if (StringUtils.isNotBlank(memberDTO.getAddr())) memberEntity.updateAddr(memberDTO.getAddr());
            if (StringUtils.isNotBlank(memberDTO.getAddrDetail()))
                memberEntity.updateAddrDetail(memberDTO.getAddrDetail());
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.OK)
                    .message("회원 수정이 되었습니다.")
                    .body(memberDTO).build();
        }

    }

    // 회원 탈퇴
    public Message<MemberDTO> deleteMember(Long id) {
        Optional<Member> member = memberRepository.findById(id);
        Member memberEntity = member.orElse(null);
        if (memberEntity == null) {
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 없습니다.").build();
        } else {
            memberRepository.delete(memberEntity);
            return Message.<MemberDTO>createMessage()
                    .header(StatusEnum.OK)
                    .message("회원 탈퇴하였습니다.")
                    .build();
        }
    }

    // 아이디 찾기
    public Message<Object> forgotLoginId(MemberDTO memberDTO) {
        if (StringUtils.isBlank(memberDTO.getName()) || StringUtils.isBlank(memberDTO.getMail())) {
            return Message.createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("이름 또는 이메일을 입력하지 않았습니다.").build();
        }
        Optional<Member> member = memberRepository.findByNameAndMail(memberDTO.getName(), memberDTO.getMail());
        return ForgotValidateOptionalMember(member);
    }

    public Message<Object> ForgotValidateOptionalMember(Optional<Member> member) {
        Member memberEntity = member.orElse(null);
        if (memberEntity == null) {
            return Message.createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 존재하지 않습니다.").build();
        }
        MemberDTO memberDTO = MemberDTO.createMemberDTO()
                .id(memberEntity.getId())
                .loginId(memberEntity.getLoginId())
                .mail(memberEntity.getMail())
                .name((memberEntity.getName())).build();
        return Message.createMessage()
                .header(StatusEnum.OK)
                .message("회원이 존재합니다.")
                .body(memberDTO).build();
    }

    // 비밀번호 찾기
    public Message<Object> forgotPassword(MemberDTO memberDTO) {
        if (StringUtils.isBlank(memberDTO.getLoginId()) || StringUtils.isBlank(memberDTO.getPhone())) {
            return Message.createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("아이디 또는 비밀번호를 입력하지 않았습니다.").build();
        }
        Optional<Member> member = memberRepository.findByLoginIdAndPhone(memberDTO.getLoginId(), memberDTO.getPhone());
        return ForgotValidateOptionalMember(member);
    }

    // 비밀번호 재설정
    public Message<Object> resetPassword(Long id, MemberDTO memberDTO) {
        Optional<Member> member = memberRepository.findById(id);
        Member memberEntity = member.orElse(null);
        if (memberEntity == null) {
            return Message.createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 없습니다.").build();
        }
        if (StringUtils.isNotBlank(memberDTO.getPassword()))
            memberEntity.updateEncodePassword(encodePassword(memberDTO.getPassword()));
        return Message.createMessage()
                .header(StatusEnum.OK)
                .message("비밀번호 재설정되었습니다.").build();
    }
}
