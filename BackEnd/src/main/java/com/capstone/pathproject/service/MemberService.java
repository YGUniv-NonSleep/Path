package com.capstone.pathproject.service;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.repository.MemberRepository;
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
    public Long signup(Member member) {
        validateDuplicateUser(member);
        memberRepository.save(member);
        return member.getId();
    }

    private void validateDuplicateUser(Member member) {
        List<Member> findMembers = memberRepository.findByLoginId(member.getLoginId());
        if (!findMembers.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }
}