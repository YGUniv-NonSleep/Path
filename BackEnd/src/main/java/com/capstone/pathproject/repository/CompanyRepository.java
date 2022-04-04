package com.capstone.pathproject.repository;

import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    List<Company> findByMemberId(Long memberId);
}
