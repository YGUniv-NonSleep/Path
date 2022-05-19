package com.capstone.pathproject.domain.order;


import com.capstone.pathproject.domain.company.DetailOption;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@SequenceGenerator(
        name = "ORDER_OPTION_SEQ_GENERATOR",
        sequenceName = "ORDER_OPTION_SEQ",
        initialValue = 1,
        allocationSize = 1
)
public class OptionComposition {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "ORDER_OPTION_SEQ_GENERATOR")
    @Column(name = "COMP_OPT_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "COMPOSITION_ID")
    private Composition composition;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DETAIL_OPTION_ID")
    private DetailOption detailOption;

    @Builder(builderMethodName = "createOptionComposition")
    public OptionComposition(Long id, Composition composition, DetailOption detailOption){
        this.composition = composition;
        this.id = id;
        this.detailOption = detailOption;

    }



}
