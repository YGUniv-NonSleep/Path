package com.capstone.pathproject.repository.company;

import com.capstone.pathproject.domain.company.CompMember;
import com.capstone.pathproject.domain.company.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompMemberRepository extends JpaRepository<CompMember, Long> {

    Optional<Company> findByIdAndMemberId(Long memberId, Long companyId);

    List<CompMember> findByCompanyId(Long compId);


}
