package com.capstone.pathproject.dto;

import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.domain.company.ProdBasic;
import lombok.*;

import java.time.LocalDate;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductDTO {
    private Long id;
    private int price;
    private Boolean exposure;
    private int discount;
    private LocalDate created;
    private int stock;
    private Company company;
    private ProdBasic basic;

    @Builder(builderMethodName = "createProductDTO")
    public ProductDTO(long id, int price, Boolean exposure, int discount, LocalDate created, int stock, Company company, ProdBasic basic){
    this.id = id;
    this.price = price;
    this.exposure = exposure;
    this.discount = discount;
    this.created = created;
    this.stock = stock;
    this.company = company;
    this.basic = basic;

    }



}
