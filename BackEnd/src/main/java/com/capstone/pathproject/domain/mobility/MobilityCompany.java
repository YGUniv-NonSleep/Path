package com.capstone.pathproject.domain.mobility;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

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
    @Column(name = "MOBILITY_CO_ID")
    private Long id;

    @Column(name = "MOBILITY_CO_NAME")
    private String name;

    @Column(name = "MOBILITY_CO_CRN")
    private String companyNumber;

    @Column(name = "MOBILITY_CO_OPEN_DATE")
    private LocalDate openDate;

    @Column(name = "MOBILITY_CO_MAIL")
    private String mail;

    @Column(name = "MOBILITY_CO_CEO_NAME")
    private String ceoName;

    @Column(name = "MOBILITY_CO_CEO_PHONE")
    private String ceoPhone;

    @Column(name = "MOBILITY_CO_UNLOCK_FEE")
    private String unlockFee;

    @Column(name = "MOBILITY_CO_MINUTE_FEE")
    private String minuteFee;
}
