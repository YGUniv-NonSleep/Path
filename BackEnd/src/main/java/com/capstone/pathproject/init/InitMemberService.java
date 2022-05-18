package com.capstone.pathproject.init;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.MemberGender;
import com.capstone.pathproject.domain.member.Role;
import com.capstone.pathproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
@Transactional
@RequiredArgsConstructor
public class InitMemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    public void dbInitMember() {
        memberRepository.save(createMember("member"));
        memberRepository.save(createBusiness("business"));
        memberRepository.save(createAdmin("admin"));

        for (int i = 1; i < 11; i++) {
            memberRepository.save(createMember("member" + i));
        }

        for (int i = 1; i < 11; i++) {
            memberRepository.save(createBusiness("business" + i));
        }

    }

    public Member createMember(String name) {
        return Member.createMember()
                .role(Role.ROLE_MEMBER)
                .loginId(name)
                .password(bCryptPasswordEncoder.encode("asdf"))
                .mail(name + "@naver.com")
                .name(name)
                .phone("010-1111-1111")
                .postId(11111)
                .addr("멤버시 멤버구 멤버로 11길")
                .addrDetail("멤버아파트 1동 1호")
                .addrExtra("멤버동")
                .gender(MemberGender.MALE)
                .birthday(LocalDate.now())
                .account("계좌번호" + name)
                .score(100)
                .build();
    }

    public Member createBusiness(String name) {
        return Member.createMember()
                .role(Role.ROLE_BUSINESS)
                .loginId(name)
                .password(bCryptPasswordEncoder.encode("asdf"))
                .mail(name + "@naver.com")
                .name(name)
                .phone("010-2222-2222")
                .postId(22222)
                .addr("비즈니스시 비즈니스로 22길")
                .addrDetail("비즈니스아파트 2동 2호")
                .addrExtra("비즈니스동")
                .gender(MemberGender.MALE)
                .birthday(LocalDate.now())
                .account("계좌번호" + name)
                .score(100)
                .build();
    }

    public Member createAdmin(String name) {
        return Member.createMember()
                .role(Role.ROLE_ADMIN)
                .loginId(name)
                .password(bCryptPasswordEncoder.encode("asdf"))
                .mail(name + "@naver.com")
                .name(name)
                .phone("010-3333-3333")
                .postId(33333)
                .addr("관리자시 관리자로 33길")
                .addrDetail("관리자아파트 3동 3호")
                .addrExtra("관리자동")
                .gender(MemberGender.FEMALE)
                .birthday(LocalDate.now())
                .account("계좌번호" + name)
                .score(100)
                .build();
    }
}
