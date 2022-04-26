package com.capstone.pathproject.repository.member;

import com.capstone.pathproject.domain.member.Card;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.Role;
import com.capstone.pathproject.domain.member.memberGender;
import com.capstone.pathproject.dto.member.CardDTO;
import com.capstone.pathproject.dto.member.MemberDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class CardRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    CardRepository cardRepository;

    @PersistenceContext
    EntityManager em;

    private Card createCard(int num, Member member) {
        return Card.builder()
                .number("카드번호"+num)
                .createTime(LocalDateTime.now())
                .cardCompany("카드회사"+num)
                .billingKey("토스접근키"+num)
                .member(member)
                .build();
    }

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
                .gender(memberGender.MALE)
                .birthday(LocalDate.parse("2000-01-01"))
                .signupDay(LocalDate.now())
                .account("계좌")
                .score(100)
                .build();
    }

    @Test
    public void testCard() {
        Card card = createCard(1, null);
        Card savedCard = cardRepository.save(card);
        Card findCard = cardRepository.findById(savedCard.getId()).get();

        assertThat(findCard.getId()).isEqualTo(card.getId());
        assertThat(findCard.getNumber()).isEqualTo(card.getNumber());
        assertThat(findCard).isEqualTo(card);
    }

    @Test
    public void basicCRUD() {
        Member member1 = createMember(1);
        memberRepository.save(member1);

        Card card1 = createCard(1, member1);
        Card card2 = createCard(2, member1);
        cardRepository.save(card1);
        cardRepository.save(card2);

        // 단건 조회 검증
        Card findCard1 = cardRepository.findById(card1.getId()).get();
        Card findCard2 = cardRepository.findById(card2.getId()).get();
        assertThat(findCard1).isEqualTo(card1);
        assertThat(findCard2).isEqualTo(card2);

        // 리스트 조회 검증
        List<Card> allCards = cardRepository.findAll();
        assertThat(allCards.size()).isEqualTo(2);

        // 카운트 검증
        long count = cardRepository.count();
        assertThat(count).isEqualTo(2);

        // 삭제 검증
        cardRepository.delete(card1);
        cardRepository.delete(card2);

        // 카운트 검증
        long deleteCount = cardRepository.count();
        assertThat(deleteCount).isEqualTo(0);
    }

    @Test
    void findMemberCard() throws Exception {
        //given
        Member member1 = createMember(1);
        memberRepository.save(member1);

        Card card1 = createCard(1, member1);
        Card card2 = createCard(2, member1);
        cardRepository.save(card1);
        cardRepository.save(card2);

        //when
        List<Card> cards = cardRepository.findByMember(member1);
        for (Card card : cards) {
            System.out.println("card = " + card);
        }
        Card findCard = cards.get(0);
        //then
        assertThat(cards.size()).isEqualTo(2);
        assertThat(findCard.getNumber()).isEqualTo(card1.getNumber());
        assertThat(findCard).isEqualTo(card1);
        assertThat(findCard.getMember()).isEqualTo(member1);
    }

    @Test
    void findMemberCardDTO() throws Exception {
        //given
        Member member1 = createMember(1);
        memberRepository.save(member1);

        Card card1 = createCard(1, member1);
        Card card2 = createCard(2, member1);
        cardRepository.save(card1);
        cardRepository.save(card2);

        //when
        List<CardDTO> cardDTOs = cardRepository.findMemberCardDTO(member1);
        for (CardDTO dto : cardDTOs) {
            System.out.println("dto = " + dto);
        }
        CardDTO findCardDTO = cardDTOs.get(0);
        //then
        assertThat(findCardDTO.getId()).isEqualTo(card1.getId());
        assertThat(findCardDTO.getNumber()).isEqualTo(card1.getNumber());
        assertThat(findCardDTO.getCardCompany()).isEqualTo(card1.getCardCompany());
    }

}