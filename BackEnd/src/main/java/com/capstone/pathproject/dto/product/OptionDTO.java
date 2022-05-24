package com.capstone.pathproject.dto.product;

import com.capstone.pathproject.domain.company.DetailOption;
import com.capstone.pathproject.domain.company.Option;
import com.capstone.pathproject.domain.company.Product;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class OptionDTO {
    private Long id;
    private String name;
    private ProductDTO product;
    private List<DetailOptionDTO> detailOptionList;
    private Long proId;

    @Builder(builderMethodName ="createOptionDTO")
    public OptionDTO(Long id,String name,ProductDTO product, List<DetailOptionDTO> detailOptionList,Long proId){
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
                .detailOptionList( toEntityList(detailOptionList) )
                .proId(proId)
                .build();
    }

    private List<DetailOption> toEntityList(List<DetailOptionDTO> dtoList){
        ArrayList<DetailOption> detailOptionList = new ArrayList<>();

        System.out.println("DetailOptionDtoList");
        for (DetailOptionDTO a: dtoList
        ) {
            System.out.println(a.toString());
        }

        dtoList.stream().map(detailOptionDTO -> detailOptionDTO.toEntity()).forEach(detailOption -> detailOptionList.add(detailOption));

        return detailOptionList;
    }



}
