package com.capstone.pathproject.repository.product;

import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.domain.company.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCompanyId(Long companyId);

}