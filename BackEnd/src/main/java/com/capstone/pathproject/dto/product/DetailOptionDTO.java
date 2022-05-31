package com.capstone.pathproject.dto.product;


import com.capstone.pathproject.domain.company.DetailOption;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DetailOptionDTO {
    private Long id;
    private String name;
    private int price;
    private Long optionId;

    @Builder(builderMethodName = "createDetailOptionDTO")
    public DetailOptionDTO(Long id, String name, int price, Long optionId){
        this.id = id;
        this.name = name;
        this.price = price;
        this.optionId = optionId;
    }

    public DetailOption toEntity(){
        return DetailOption.createDetailOption()
                .id(id)
                .name(name)
                .price(price)
                .optionId(optionId)
                .build();
    }

    public DetailOptionDTO(DetailOption detailOption){
        this.id = detailOption.getId();
        this.name = detailOption.getName();
        this.price = detailOption.getPrice();
        this.optionId = detailOption.getOptionId();
    }

    public List<DetailOption> toEntityList(List<DetailOptionDTO> dtoList){
        ArrayList<DetailOption> detailOptionList = null;

        dtoList.stream().map(detailOptionDTO -> detailOptionDTO.toEntity()).forEach(detailOption -> detailOptionList.add(detailOption));

        return detailOptionList;
    }

}
