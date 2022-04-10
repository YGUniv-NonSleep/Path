package com.capstone.pathproject.repository.product;

import com.capstone.pathproject.domain.company.ProdBasic;
import com.capstone.pathproject.domain.company.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdBasicRepository extends JpaRepository<ProdBasic, Long> {

    List<ProdBasic> findByNameContainingAndBrandContaining(String name, String brand);

}
