package com.capstone.pathproject.repository.member.query;

import com.capstone.pathproject.domain.member.Card;
import com.capstone.pathproject.dto.member.CardDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CardQueryRepository extends JpaRepository<Card, Long> {

    @Query("select new com.capstone.pathproject.dto.member.CardDto(c.id, c.number, c.cardCompany, c.type, c.createdDateTime) " +
            "from Card c " +
            "where c.member.id = :memberId")
    List<CardDto> findMemberCardDtos(@Param("memberId") Long memberId);
}
