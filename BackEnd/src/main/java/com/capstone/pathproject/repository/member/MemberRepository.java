package com.capstone.pathproject.repository.member;

import com.capstone.pathproject.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByLoginId(String loginId);

    Optional<Member> findByNameAndMail(String name, String mail);

    Optional<Member> findByLoginIdAndPhone(String loginId, String phone);

    @Modifying(clearAutomatically = true)
    @Query("update Member m set m.score = m.score + :score where m.id in :memberIds")
    void penaltyMember(@Param("memberIds") List<Long> memberIds, @Param("score") int score);
}
