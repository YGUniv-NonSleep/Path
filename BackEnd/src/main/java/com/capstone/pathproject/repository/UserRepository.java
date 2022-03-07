package com.capstone.pathproject.repository;

import com.capstone.pathproject.domain.user.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<Member, Long> {

    List<Member> findByLoginId(String loginId);
}
