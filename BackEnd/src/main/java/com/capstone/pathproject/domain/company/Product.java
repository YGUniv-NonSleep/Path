package com.capstone.pathproject.domain.company;

import com.capstone.pathproject.domain.member.Member;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@SequenceGenerator(
        name = "PRODUCT_SEQ_GENERATOR",
        sequenceName = "PRODUCT_SEQ",
        initialValue = 1, allocationSize = 1
)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PRODUCT_SEQ_GENERATOR")
    @Column(name = "PROD_ID")
    private Long id;

    @Column(name = "PROD_PRICE")
    private int Price;

    @Column(name = "PROD_EXPOSURE")
    private Boolean exposure;

    @Column(name ="PROD_DISCOUNT_RATE")
    private int discount;

    @Column(name = "PROD_CREATED")
    private LocalDate created;

    @Column(name = "PROD_STOCK")
    private int stock;

    @ManyToOne
    @JoinColumn(name = "COMPANY_ID")
    private Company companyId;

    @ManyToOne
    @JoinColumn(name = "BASIC_ID")
    private ProdBasic basicId;

}

