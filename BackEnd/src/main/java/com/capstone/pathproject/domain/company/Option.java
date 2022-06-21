package com.capstone.pathproject.domain.company;

import com.capstone.pathproject.dto.product.DetailOptionDTO;
import com.capstone.pathproject.dto.product.OptionDTO;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@SequenceGenerator(
        name = "OPTION_SEQUENCE_GENERATOR",
        sequenceName = "OPTION_SEQ",
        initialValue = 1, allocationSize = 1
)
@Getter
@Table(name = "PRODUCT_OPTION")
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "OPTION_SEQUENCE_GENERATOR")
    @Column(name = "OPTION_ID")
    private Long id;

    @Column(name = "OPTION_NAME")
    private String name;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "OPTION_ID")
    private List<DetailOption> detailOptionList;

    @Column(name = "PRO_ID")
    private Long proId;

    @Builder(builderMethodName = "createOption")
    public Option(Long id, String name, List<DetailOption> detailOptionList, Long proId){
        this.id = id;
        this.name = name;
        this.detailOptionList =  detailOptionList;
        this.proId = proId;
    }

    public Option() {}

//    public OptionDTO toDTO(){
//        return OptionDTO.createOptionDTO()
//                .detailOptionList(toDtoList(detailOptionList))
//                .id(id)
//                .name(name)
//                .proId(proId)
//                .build();
//    }




//    private List<DetailOptionDTO> toDtoList(List<DetailOption> entityList){
//        ArrayList<DetailOptionDTO> detailOptionList = new ArrayList<>();
//
//        entityList.stream().map(detailOption -> detailOption.toDTO()).forEach(detailOptionDTO -> detailOptionList.add(detailOptionDTO));
//
//        return detailOptionList;
//
//    }

    public void addDetailOptions(ArrayList<DetailOption> detailOptions) {
        this.detailOptionList = detailOptions;
    }
}
