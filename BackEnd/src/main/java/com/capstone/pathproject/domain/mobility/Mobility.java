package com.capstone.pathproject.domain.mobility;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@SequenceGenerator(
        name = "MOBILITY_SEQ_GENERATOR",
        sequenceName = "MOBILITY_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Mobility {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MOBILITY_SEQ_GENERATOR")
    @Column(name = "MOBIL_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MOBIL_CO_ID")
    private MobilityCompany mobilityCompany;

    @Column(name = "MOBIL_BATTERY")
    private int battery;

    @Column(name = "MOBIL_LONG")
    private String longitude;

    @Column(name = "MOBIL_LAT")
    private String latitude;

    @Enumerated(EnumType.STRING)
    @Column(name = "MOBIL_STATE")
    private MobilityState state;

    @Enumerated(EnumType.STRING)
    @Column(name = "MOBIL_TYPE")
    private MobilityType type;
}
