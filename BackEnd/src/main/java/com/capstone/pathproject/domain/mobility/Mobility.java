package com.capstone.pathproject.domain.mobility;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    @Column(name = "MOBILITY_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MOBILITY_CO_ID")
    private MobilityCompany mobilityCompany;

    @OneToMany(mappedBy = "mobility")
    private List<MobilityPayment> mobilityPayments = new ArrayList<MobilityPayment>();

    @OneToMany(mappedBy = "mobility")
    private List<MobilityReservation> mobilityReservations = new ArrayList<MobilityReservation>();

    @Column(name = "MOBILITY_BATTERY")
    private int battery;

    @Column(name = "MOBILITY_LONG")
    private String longitude;

    @Column(name = "MOBILITY_LAT")
    private String latitude;

    @Enumerated(EnumType.STRING)
    @Column(name = "MOBILITY_STATE")
    private MobilityState state;

    @Enumerated(EnumType.STRING)
    @Column(name = "MOBILITY_TYPE")
    private MobilityType type;
}
