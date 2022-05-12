package com.capstone.pathproject.domain.company;

import com.capstone.pathproject.dto.product.OptionDTO;
import com.capstone.pathproject.dto.product.ProdBasicDTO;
import com.capstone.pathproject.dto.product.ProductDTO;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@ToString
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
    private int price;

    @Column(name = "PRO_EXPOSURE")
    private Boolean exposure;

    @Column(name ="PRO_DISCOUNT_RATE")
    private int discount;

    @Column(name = "PRO_CREATED")
    private LocalDate created;

    @Column(name = "PRO_STOCK")
    private int stock;

    @Column(name = "PRO_PICTURE")
    private String picture;

    @ManyToOne
    @JoinColumn(name = "COM_ID")
    private Company company;

    @ManyToOne
    @JoinColumn(name = "BASIC_ID")
    private ProdBasic prodBasic;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "PRO_ID")
    private List<Option> optionList;


    @Builder(builderMethodName = "createProduct")
    public Product(Long id, int price, boolean exposure, int discount, LocalDate created, int stock, Company company, ProdBasicDTO prodBasic, String picture, List<OptionDTO> optionList){

        //optionList.stream().map(optionDTO -> optionDTO.toEntity());

        this.id = id;
        this.price = price;
        this.exposure = exposure;
        this.discount = discount;
        this.created = created;
        this.stock = stock;
        this.company = company;
        this.prodBasic = prodBasic.toEntity();
        this.picture = picture;
        this.optionList = toEntityList(optionList);

    }

    public Product() {}

    public ProductDTO toDTO(){
        return ProductDTO.createProductDTO()
                .company(this.company.toDTO())
                .id(this.id)
                .created(this.created)
                .discount(this.discount)
                .exposure(this.exposure)
                .optionList( toDtoList(optionList)  )
                .price(this.price)
                .prodBasic(this.prodBasic.toDTO())
                .stock(this.stock)
                .picture(this.picture)
                .build();
    }

    public List<Option> toEntityList(List<OptionDTO> dtoList ){

        ArrayList<Option> optionList = null;

        dtoList.stream().map(optionDTO -> optionDTO.toEntity()).forEach(option -> optionList.add(option));

        return optionList;
    }

    public List<OptionDTO> toDtoList(List<Option> entityList){

        ArrayList<OptionDTO> optionList = null;
        entityList.stream().map(option -> option.toDTO()).forEach(optionDTO -> optionList.add(optionDTO));
        return optionList;
    }


}

