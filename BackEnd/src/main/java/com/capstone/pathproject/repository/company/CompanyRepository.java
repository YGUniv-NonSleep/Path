package com.capstone.pathproject.repository.company;

import com.capstone.pathproject.domain.company.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    List<Company> findByMemberId(Long memberId);

    Optional<Company> findByIdAndMemberId(Long memberId, Long companyId);
}
