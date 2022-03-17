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
    @Column(name = "PRO_ID")
    private Long id;

    @Column(name = "PRO_PRICE")
    private int Price;

    @Column(name = "PRO_EXPOSURE")
    private Boolean exposure;

    @Column(name ="PRO_DISCOUNT_RATE")
    private int discount;

    @Column(name = "PRO_CREATED")
    private LocalDate created;

    @Column(name = "PRO_STOCK")
    private int stock;

    @ManyToOne
    @JoinColumn(name = "COM_ID")
    private Company company;

    @ManyToOne
    @JoinColumn(name = "BASIC_ID")
    private ProdBasic basic;

}

