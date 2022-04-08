package com.capstone.pathproject.dto.product;

import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.domain.company.Option;
import com.capstone.pathproject.domain.company.ProdBasic;
import com.capstone.pathproject.domain.company.Product;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

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
    private ProdBasic prodbasic;
    private String picture;
    private List<Option> optionList;

    @Builder(builderMethodName = "createProductDTO")
    public ProductDTO(long id, int price, Boolean exposure, int discount, LocalDate created, int stock, Company company, ProdBasic prodbasic, String picture, List<Option> optionList){
    this.id = id;
    this.price = price;
    this.exposure = exposure;
    this.discount = discount;
    this.created = created;
    this.stock = stock;
    this.picture = picture;
    this.company = company;
    this.prodbasic = prodbasic;
    this.optionList = optionList;

    }

    public Product toEntity(){
        return Product.createProduct()
                .id(id)
                .created(created)
                .discount(discount)
                .exposure(exposure)
                .price(price)
                .stock(stock)
                .prodBasic(prodbasic)
                .company(company)
                .optionList(optionList)
                .picture(picture)
                .build();
    }



}
