package com.capstone.pathproject.domain.company;


import com.capstone.pathproject.domain.member.Member;

import com.capstone.pathproject.dto.company.CompanyDTO;
import com.capstone.pathproject.dto.member.MemberDto;
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

    @Column(name = "COM_THUMBNAIL")
    private String thumbnail;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEM_ID")
    private Member member;

    public Company(){}

    @Builder(builderMethodName = "createCompany")
    public Company(Long id, String name, String companyNumber, LocalDate openDate, CompCategory category, String mail, String phone, String latitude, String longitude, MemberDto member, String thumbnail) {
        this.id = id;
        this.companyNumber = companyNumber;
        this.openDate = openDate;
        this.category = category;
        this.name = name;
        this.mail = mail;
        this.phone = phone;
        this.latitude = latitude;
        this.longitude = longitude;
        this.thumbnail = thumbnail;
        this.member = member.toEntity();

    }

    public CompanyDTO toDTO(){
        MemberDto memberDTO = MemberDto.createMemberDto()
                .id(member.getId())
                .name(member.getName())
                .loginId(member.getLoginId()).build();

        return CompanyDTO.createCompanyDTD()
                .id(this.id)
                .companyNumber(this.companyNumber)
                .category(this.category)
                .latitude(this.latitude)
                .longitude(this.longitude)
                .mail(this.mail)
                .member(memberDTO)
                .name(this.name)
                .openDate(this.openDate)
                .phone(this.phone)
                .thumbnail(this.thumbnail)
                .build();
    }

}
