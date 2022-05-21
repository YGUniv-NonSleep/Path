package com.capstone.pathproject.repository.member;

import com.capstone.pathproject.domain.member.Card;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.member.CardDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {

    List<Card> findByMember(Member member);

    @Query("select new com.capstone.pathproject.dto.member.CardDto(c.id, c.number, c.cardCompany, c.type, c.createdDateTime) from Card c where c.member.id = :memberId")
    List<CardDto> findAllMemberCardDtos(@Param("memberId") Long memberId);
}
