package com.capstone.pathproject.dto;

import com.capstone.pathproject.domain.company.ProdBasic;
import lombok.*;


@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProdBasicDTO {
    private Long id;
    private String name;
    private String image;
    private String detail;
    private String brand;
    private String categori;

    @Builder(builderMethodName = "createProdBasicDTO")
    public ProdBasicDTO(Long id, String name, String image, String detail, String brand, String categori){
        this.id = id;
        this.name = name;
        this.image = image;
        this.detail = detail;
        this.brand = brand;
        this.categori = categori;

    }

    public ProdBasic toEntity(){
        return ProdBasic.createProdBasic()
                .id(id)
                .name(name)
                .image(image)
                .detail(detail)
                .brand(brand)
                .categori(categori)
                .build();
    }





}
