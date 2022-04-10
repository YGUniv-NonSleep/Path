package com.capstone.pathproject.repository.member;

import com.capstone.pathproject.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.validation.constraints.NotBlank;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByLoginId(String loginId);

    Optional<Member> findByNameAndMail(String name, String mail);

    Optional<Member> findByLoginIdAndPhone(String loginId, String phone);
}
