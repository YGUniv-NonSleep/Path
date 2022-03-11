package com.capstone.pathproject.domain.company;

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
    @Column(name = "DETAIL_OPTION_ID")
    private Long id;

    @Column(name = "DETAIL_OPTION_NAME")
    private String name;

    @Column(name = "DETAIL_OPTION_PRICE")
    private int price;

    @ManyToOne
    @JoinColumn(name = "OPTION_ID")
    private Option optionId;

}
