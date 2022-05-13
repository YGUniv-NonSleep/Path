package com.capstone.pathproject.dto.mobility;

import com.capstone.pathproject.domain.mobility.MobilityCompany;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LocationMobilityCompanyDto {
    private Long id;
    private String name;
    private String mail;
    private int unlockFee;
    private int minuteFee;

    public LocationMobilityCompanyDto(MobilityCompany company) {
        this.id = company.getId();
        this.name = company.getName();
        this.mail = company.getMail();
        this.unlockFee = company.getUnlockFee();
        this.minuteFee = company.getMinuteFee();
    }
}
