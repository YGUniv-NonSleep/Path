package com.capstone.pathproject.repository;

import com.capstone.pathproject.domain.company.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}