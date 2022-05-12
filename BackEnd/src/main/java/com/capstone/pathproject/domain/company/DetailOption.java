package com.capstone.pathproject.domain.company;

import com.capstone.pathproject.dto.product.DetailOptionDTO;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Entity
@SequenceGenerator(
        name = "DETAIL_OPTION_SEQUENCE_GENERATOR",
        sequenceName = "DETAIL_OPTION_SEQ",
        initialValue = 1, allocationSize = 1
)
@Getter
public class DetailOption {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DETAIL_OPTION_SEQUENCE_GENERATOR")
    @Column(name = "DETAIL_OPTION_ID")
    private Long id;

    @Column(name = "DETAIL_OPTION_NAME")
    private String name;

    @Column(name = "DETAIL_OPTION_PRICE")
    private int price;

    @Column(name="OPTION_ID")
    private Long optionId;

    @Builder(builderMethodName = "createDetailOption")
    public DetailOption(Long id, String name, int price,Long optionId ){
        this.id = id;
        this.name = name;
        this.price = price;
        this.optionId = optionId;
    }

    public DetailOption(){}

    public DetailOptionDTO toDTO(){
        return DetailOptionDTO.createDetailOptionDTO()
                .id(id)
                .optionId(optionId)
                .name(name)
                .price(price)
                .build();
    }

}
