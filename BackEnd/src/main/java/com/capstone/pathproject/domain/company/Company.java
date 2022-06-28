package com.capstone.pathproject.domain.company;


import com.capstone.pathproject.domain.member.Member;

import com.capstone.pathproject.dto.company.CompanyDTO;
import com.capstone.pathproject.dto.member.MemberDto;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

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
    private double latitude;

    @Column(name = "COM_LONG")
    private double longitude;

    @Column(name = "COM_ADDR")
    private String addr;

    @Column(name = "COM_ADDR_DETAIL")
    private String addrDetail;

    @Column(name = "COM_OPEN")
    private LocalTime open;

    @Column(name = "COM_CLOSE")
    private LocalTime close;

    @Column(name = "COM_WAITTIME")
    private int waitTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEM_ID")
    private Member member;

    public Company() {
    }

    @Builder(builderMethodName = "createCompany")
    public Company(Long id, LocalTime open, LocalTime close, String name, String companyNumber, LocalDate openDate, CompCategory category, String mail, String phone, double latitude, double longitude, Member member, String thumbnail, String addr, String addrDetail, int waitTime) {
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
        this.addr = addr;
        this.addrDetail = addrDetail;
        this.open = open;
        this.close = close;
        this.member = member;
        this.waitTime = waitTime;
    }

    public void delete() {
        this.companyNumber = null;
        this.openDate = null;
        this.category = null;
        this.name = null;
        this.mail = null;
        this.phone = null;
        this.latitude = 0;
        this.longitude = 0;
        this.thumbnail = null;
        this.addr = null;
        this.addrDetail = null;
        this.open = null;
        this.close = null;
        this.member = null;
        this.waitTime = 0;
    }

}
