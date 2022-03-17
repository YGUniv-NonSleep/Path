package com.capstone.pathproject.dto;

import com.capstone.pathproject.domain.company.CompCategory;
import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.domain.member.Member;
import lombok.*;

import java.time.LocalDate;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CompanyDTO {
    private Long id;
    private String name;
    private String companyNumber;
    private LocalDate openDate;
    private CompCategory category;
    private String mail;
    private String phone;
    private Member member;
    private String latitude;
    private String longitude;

    @Builder(builderMethodName = "createCompanyDTD")
    public CompanyDTO(Long id, String name, String companyNumber, LocalDate openDate, CompCategory category, String mail, String phone, String latitude, String longitude, Member member) {
        this.id = id;
        this.name = name;
        this.companyNumber = companyNumber;
        this.openDate = openDate;
        this.category = category;
        this.mail = mail;
        this.phone = phone;
        this.longitude = longitude;
        this.latitude = latitude;
        this.member = member;
    }

    @Builder(builderMethodName = "createDTOByCompany")
    public CompanyDTO(Company c) {
        this.id = c.getId();
        this.name = c.getName();
        this.companyNumber = c.getCompanyNumber();
        this.openDate = c.getOpenDate();
        this.category = c.getCategory();
        this.mail = c.getMail();
        this.phone = c.getPhone();
        this.longitude = c.getLongitude();
        this.latitude = c.getLatitude();
        this.member = c.getMember();
    }

    public Company toEntity() {
        return Company.createCompany()
                .id(id)
                .companyNumber(companyNumber)
                .mail(mail)
                .category(category)
                .name(name)
                .openDate(openDate)
                .phone(phone)
                .member(member)
                .build();


    }
}
