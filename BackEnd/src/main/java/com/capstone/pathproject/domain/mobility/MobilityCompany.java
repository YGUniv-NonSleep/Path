package com.capstone.pathproject.domain.mobility;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@SequenceGenerator(
        name = "MOBILITY_COMPANY_SEQ_GENERATOR",
        sequenceName = "MOBILITY_COMPANY_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MobilityCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MOBILITY_COMPANY_SEQ_GENERATOR")
    @Column(name = "MOBIL_CO_ID")
    private Long id;

    @Column(name = "MOBIL_CO_NAME")
    private String name;

    @Column(name = "MOBIL_CO_CRN")
    private String companyNumber;

    @Column(name = "MOBIL_CO_OPEN_DATE")
    private LocalDate openDate;

    @Column(name = "MOBIL_CO__MAIL")
    private String mail;

    @Column(name = "MOBIL_CO_CEO_NAME")
    private String ceoName;

    @Column(name = "MOBIL_CO__CEO_PHONE")
    private String ceoPhone;

    @Column(name = "MOBIL_CO_UNLOCK_FEE")
    private int unlockFee;

    @Column(name = "MOBIL_CO_MINUTE_FEE")
    private int minuteFee;

    @Builder(builderMethodName = "createMobilityCompany")
    public MobilityCompany(Long id, String name, String companyNumber, LocalDate openDate, String mail, String ceoName, String ceoPhone, int unlockFee, int minuteFee) {
        this.id = id;
        this.name = name;
        this.companyNumber = companyNumber;
        this.openDate = openDate;
        this.mail = mail;
        this.ceoName = ceoName;
        this.ceoPhone = ceoPhone;
        this.unlockFee = unlockFee;
        this.minuteFee = minuteFee;
    }
}
