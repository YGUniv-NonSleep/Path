package com.capstone.pathproject.repository.product;

import com.capstone.pathproject.domain.company.CompCategory;
import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.domain.company.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCompanyId(Long companyId);

    @Query("select c " +
            "from Product c " +
            "where (c.company.longitude between :x - 0.0055 and :x + 0.0055) " +
            "and (c.company.latitude between :y - 0.00475 and :y + 0.00475) " +
            "and (c.prodBasic.name like %:name%)"
    )
    List<Product> findLocationProducts(@Param("x") double x, @Param("y") double y, @Param("name") String name );


    @Query("select c " +
            "from Product c " +
            "where (c.company.longitude between :x - 0.0055 and :x + 0.0055) " +
            "and (c.company.latitude between :y - 0.00475 and :y + 0.00475) " +
            "and (c.prodBasic.name like %:name%)"+
            "and (c.company.category = :category)"
    )
    List<Product> findLocationAndCategoryProducts(@Param("x") double x, @Param("y") double y, @Param("name") String name, @Param("category")CompCategory category);

}