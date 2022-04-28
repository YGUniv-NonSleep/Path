package com.capstone.pathproject.dto.product;


import com.capstone.pathproject.domain.company.DetailOption;
import lombok.*;

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
}
