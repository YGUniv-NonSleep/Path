package com.capstone.pathproject.controller.repository;

import com.capstone.pathproject.domain.company.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {

}
