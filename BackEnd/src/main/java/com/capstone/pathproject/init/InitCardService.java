package com.capstone.pathproject.init;

import com.capstone.pathproject.domain.member.Card;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.repository.member.CardRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Component
@Transactional
@RequiredArgsConstructor
public class InitCardService {

    private final CardRepository cardRepository;
    private final MemberRepository memberRepository;


    public void dbInitCard() {
        // 일반 회원 카드 등록
        Member member = memberRepository.findById(1L).get();
        cardRepository.save(하나카드(member));
        cardRepository.save(신한카드(member));
        cardRepository.save(BC카드(member));
    }

    public Card 하나카드(Member member) {
        return Card.builder()
                .number("461771******1111")
                .cardCompany("하나")
                .type("신용")
                .billingKey("MynwZLFIi4Rb5XRoM6GL8omOb_yEx1_coiITj9anm8o=")
                .member(member)
                .build();
    }

    public Card 신한카드(Member member) {
        return Card.builder()
                .number("559410******1111")
                .cardCompany("신한")
                .type("체크")
                .billingKey("qAU3rR7ajBRvcof_HVmjTVThALxi8mWej9M3u1Iommc=")
                .member(member)
                .build();
    }

    public Card BC카드(Member member) {
        return Card.builder()
                .number("944603******1111")
                .cardCompany("BC")
                .type("신용")
                .billingKey("eoeZ4lorSpqTwpsqBbhEBJ83DjVMnucCV5D4NKTARi4=")
                .member(member)
                .build();
    }
}
