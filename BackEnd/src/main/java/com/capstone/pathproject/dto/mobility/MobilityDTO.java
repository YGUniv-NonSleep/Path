package com.capstone.pathproject.dto.mobility;

import com.capstone.pathproject.domain.mobility.Mobility;
import com.capstone.pathproject.domain.mobility.MobilityCompany;
import com.capstone.pathproject.domain.mobility.MobilityState;
import com.capstone.pathproject.domain.mobility.MobilityType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MobilityDTO {
    private Long id;
    private int battery;
    private double longitude;
    private double latitude;
    private MobilityState state;
    private MobilityType type;
    private MobilityCompanyDTO mobilityCompanyDTO;

    @Builder
    public MobilityDTO(Long id, MobilityCompanyDTO mobilityCompanyDTO, int battery, double longitude, double latitude, MobilityState state, MobilityType type) {
        this.id = id;
        this.mobilityCompanyDTO = mobilityCompanyDTO;
        this.battery = battery;
        this.longitude = longitude;
        this.latitude = latitude;
        this.state = state;
        this.type = type;
    }

    public MobilityDTO(Mobility mobility) {
        MobilityCompany company = mobility.getMobilityCompany();
        MobilityCompanyDTO mobilityCompanyDTO = MobilityCompanyDTO.craeteForMobil()
                .id(company.getId())
                .name(company.getName())
                .mail(company.getMail())
                .unlockFee(company.getUnlockFee())
                .minuteFee(company.getMinuteFee())
                .build();
        this.id = mobility.getId();
        this.mobilityCompanyDTO = mobilityCompanyDTO;
        this.battery = mobility.getBattery();
        this.longitude = mobility.getLongitude();
        this.latitude = mobility.getLatitude();
        this.state = mobility.getState();
        this.type = mobility.getType();
    }
}
