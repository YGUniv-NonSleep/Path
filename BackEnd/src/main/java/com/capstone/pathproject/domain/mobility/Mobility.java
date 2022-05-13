package com.capstone.pathproject.domain.mobility;

import com.capstone.pathproject.domain.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
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
@AttributeOverrides({
        @AttributeOverride(name = "createdDateTime", column = @Column(name = "MOBIL_CREATED_DATETIME")),
        @AttributeOverride(name = "updatedDateTime", column = @Column(name = "MOBIL_UPDATED_DATETIME"))
})
public class Mobility extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MOBILITY_SEQ_GENERATOR")
    @Column(name = "MOBIL_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MOBIL_CO_ID")
    private MobilityCompany mobilityCompany;

    @Column(name = "MOBIL_BATTERY")
    private int battery;

    @Column(name = "MOBIL_LONG")
    private double longitude;

    @Column(name = "MOBIL_LAT")
    private double latitude;

    @Enumerated(EnumType.STRING)
    @Column(name = "MOBIL_STATE")
    private MobilityState state;

    @Enumerated(EnumType.STRING)
    @Column(name = "MOBIL_TYPE")
    private MobilityType type;

    @Builder(builderMethodName = "createMobility")
    public Mobility(Long id, MobilityCompany mobilityCompany, int battery, double longitude, double latitude, MobilityState state, MobilityType type) {
        this.id = id;
        this.mobilityCompany = mobilityCompany;
        this.battery = battery;
        this.longitude = longitude;
        this.latitude = latitude;
        this.state = state;
        this.type = type;
    }
}
