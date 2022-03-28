package com.capstone.pathproject.domain.company;


import com.capstone.pathproject.domain.member.Member;

import com.capstone.pathproject.dto.CompanyDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@ToString
@Entity
@Getter
@SequenceGenerator(
        name = "COMPANY_SEQ_GENERATOR",
        sequenceName = "COMPANY_SEQ",
        initialValue = 1, allocationSize = 1
)
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "COMPANY_SEQ_GENERATOR")
    @Column(name = "COM_ID")
    private Long id;

    @Column(name = "COM_NAME")
    private String name;

    @Column(name = "COM_CRN")
    private String companyNumber;

    @Column(name = "COM_OPEN_DATE")
    private LocalDate openDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "COM_CATEGORY")
    private CompCategory category;

    @Column(name = "COM_MAIL")
    private String mail;

    @Column(name = "COM_PHONE")
    private String phone;

    @Column(name = "COM_LAT")
    private String latitude;

    @Column(name = "COM_LONG")
    private String longitude;

    @ManyToOne
    @JoinColumn(name = "MEM_ID")
    private Member member;

    public Company(){}

    @Builder(builderMethodName = "createCompany")
    public Company(Long id, String name, String companyNumber, LocalDate openDate, CompCategory category, String mail, String phone, String latitude, String longitude, Member member) {
        this.id = id;
        this.companyNumber = companyNumber;
        this.openDate = openDate;
        this.category = category;
        this.name = name;
        this.mail = mail;
        this.phone = phone;
        this.latitude = latitude;
        this.longitude = longitude;
        this.member = member;

    }

    public CompanyDTO toDTO(){
        return CompanyDTO.createDTOByCompany()
                .c(this)
                .build();
    }


}
