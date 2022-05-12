package com.capstone.pathproject.dto.mobility;

import com.capstone.pathproject.domain.mobility.MobilityCompany;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MobilityCompanyDTO {
    private Long id;
    private String name;
    private String companyNumber;
    private LocalDate openDate;
    private String mail;
    private String ceoName;
    private String ceoPhone;
    private int unlockFee;
    private int minuteFee;

    @Builder(builderMethodName = "craeteForMobil")
    public MobilityCompanyDTO(Long id, String name, String mail, int unlockFee, int minuteFee) {
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.unlockFee = unlockFee;
        this.minuteFee = minuteFee;
    }
}
