package com.capstone.pathproject.domain.company;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Entity
@SequenceGenerator(
        name = "OPTION_SEQUENCE_GENERATOR",
        sequenceName = "OPTION_SEQ",
        initialValue = 1, allocationSize = 1
)
@Getter
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "OPTION_SEQUENCE_GENERATOR")
    @Column(name = "OPTION_ID")
    private Long id;

    @Column(name = "OPTION_NAME")
    private String name;

    @OneToMany
    @JoinColumn(name = "OPTION_ID")
    private List<DetailOption> detailOptionList;

    @Column(name = "PRO_ID")
    private Long proId;

    @Builder(builderMethodName = "createOption")
    public Option(Long id, String name, List<DetailOption> detailOptionList, Long proId){
        this.id = id;
        this.name = name;
        this.detailOptionList = detailOptionList;
        this.proId = proId;
    }

    public Option() {}
}
