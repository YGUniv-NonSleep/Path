package com.capstone.pathproject.domain.company;

import lombok.Getter;

import javax.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "PROD_ID")
    private Product prodId;

}
