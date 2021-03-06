package com.capstone.pathproject.dto.product;

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
    private String category;

    @Builder(builderMethodName = "createProdBasicDTO")
    public ProdBasicDTO(Long id, String name, String image, String detail, String brand, String category){
        this.id = id;
        this.name = name;
        this.image = image;
        this.detail = detail;
        this.brand = brand;
        this.category = category;

    }

    public ProdBasic toEntity(){
        return ProdBasic.createProdBasic()
                .id(id)
                .name(name)
                .image(image)
                .detail(detail)
                .brand(brand)
                .category(category)
                .build();
    }

    public ProdBasicDTO(ProdBasic prodBasic){
        this.id = prodBasic.getId() ;
        this.name = prodBasic.getName();
        this.image = prodBasic.getImage();
        this.detail = prodBasic.getDetail();
        this.brand = prodBasic.getBrand();
        this.category = prodBasic.getCategory();
    }


    public void addFile(String fileName) {
        this.image = fileName;
    }
}
