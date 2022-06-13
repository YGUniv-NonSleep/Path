package com.capstone.pathproject.domain.company;


import com.capstone.pathproject.dto.product.ProdBasicDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@ToString
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
    private String category;

    public ProdBasic(){}

    @Builder(builderMethodName = "createProdBasic")
    public ProdBasic(Long id, String name, String image, String detail, String brand, String category){
        this.id=id;
        this.name = name;
        this.image = image;
        this.detail = detail;
        this.brand = brand;
        this.category = category;
    }
//
//    public ProdBasicDTO toDTO(){
//        return ProdBasicDTO.createProdBasicDTO()
//                .id(this.id)
//                .brand(this.brand)
//                .category(this.category)
//                .detail(this.detail)
//                .image(this.image)
//                .name(this.name)
//                .build();
//    }


}
