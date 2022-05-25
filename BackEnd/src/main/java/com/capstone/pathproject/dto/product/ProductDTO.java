package com.capstone.pathproject.dto.product;

import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.domain.company.Option;
import com.capstone.pathproject.domain.company.ProdBasic;
import com.capstone.pathproject.domain.company.Product;
import com.capstone.pathproject.dto.company.CompanyDTO;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
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
    private CompanyDTO company;
    private ProdBasicDTO prodBasic;
    private String picture;
    private List<OptionDTO> optionList;

    @Builder(builderMethodName = "createProductDTO")
    public ProductDTO(long id, int price, Boolean exposure, int discount, LocalDate created, int stock, CompanyDTO company, ProdBasicDTO prodBasic, String picture, List<OptionDTO> optionList){
    this.id = id;
    this.price = price;
    this.exposure = exposure;
    this.discount = discount;
    this.created = created;
    this.stock = stock;
    this.picture = picture;
    this.company = company;
    this.prodBasic = prodBasic;
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
                .prodBasic(prodBasic.toEntity())
                .company(company.toEntity())
                .optionList(toEntityList( optionList))
                .picture(picture)
                .build();
    }


    public List<Option> toEntityList(List<OptionDTO> dtoList ){

        for (OptionDTO a  : dtoList ) {
            System.out.println(a.toString());
        }

        ArrayList<Option> optionList = new ArrayList<>();

        dtoList.stream().map(optionDTO -> optionDTO.toEntity()).forEach(option -> optionList.add(option));

        return optionList;
    }




}
