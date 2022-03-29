package com.capstone.pathproject.dto.product;

import com.capstone.pathproject.domain.company.DetailOption;
import com.capstone.pathproject.domain.company.Option;
import com.capstone.pathproject.domain.company.Product;
import lombok.*;

import java.util.List;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class OptionDTO {
    private Long id;
    private String name;
    private Product product;
    private List<DetailOption> detailOptionList;
    private Long proId;

    @Builder(builderMethodName ="createOptionDTO")
    public OptionDTO(Long id,String name,Product product,List<DetailOption> detailOptionList,Long proId){
        this.id = id;
        this.name = name;
        this.product = product;
        this.detailOptionList = detailOptionList;
        this.proId = proId;
    }

    public Option toEntity(){
        return Option.createOption()
                .id(id)
                .name(name)
                .detailOptionList(detailOptionList)
                .proId(proId)
                .build();
    }
}
