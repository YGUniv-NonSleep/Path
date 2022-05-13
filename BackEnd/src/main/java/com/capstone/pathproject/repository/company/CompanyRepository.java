package com.capstone.pathproject.repository.company;

import com.capstone.pathproject.domain.company.Company;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    List<Company> findByMemberId(Long memberId);

    Optional<Company> findByIdAndMemberId(Long memberId, Long companyId);

    @EntityGraph(attributePaths = {"member"})
    Optional<Company> findByNameAndCompanyNumber(String name, String companyNumber);

    @EntityGraph(attributePaths = {"member"})
    @Query("select c from Company c where c.name = :name and c.companyNumber = :companyNumber")
    Optional<Company> findCompany(@Param("name") String name, @Param("name") String companyNumber);
}
