package com.capstone.pathproject.domain.company;


import lombok.Getter;

import javax.persistence.*;

@Entity
@SequenceGenerator(
        name = "PROD_BASIC_SEQ_GENERATOR",
        sequenceName = "PROD_BASIC_SEQ",
        initialValue = 1, allocationSize = 1
)
@Getter
public class ProdBasic {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PROD_BASIC_SEQ_GENERATOR")
    @Column(name = "BASIC_ID")
    private Long id;

    @Column(name = "BASIC_NAME")
    private String name;

    @Column(name = "BASIC_IMAGE")
    private String image;

    @Column(name = "BASIC_DETAIL")
    private String detail;

    @Column(name = "BASIC_BRAND")
    private String brand;

    @Column(name = "BASIC_CATEGORI")
    private String categori;

}
