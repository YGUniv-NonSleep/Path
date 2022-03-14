package com.capstone.pathproject.repository;

import com.capstone.pathproject.domain.company.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {

}
