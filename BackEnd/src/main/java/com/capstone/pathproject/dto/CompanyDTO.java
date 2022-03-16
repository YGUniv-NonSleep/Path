package com.capstone.pathproject.dto;

import com.capstone.pathproject.domain.company.CompCategory;
import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.domain.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@ToString
@Getter
public class CompanyDTO {
    private String name;
    private String companyNumber;
    private LocalDate openDate;
    private CompCategory category;
    private String mail;
    private String phone;
    private Member member;

    @Builder(buildMethodName = "createCompanyDTD")
    public CompanyDTO(String name, String companyNumber, LocalDate openDate, CompCategory category, String mail, String phone, Member member ){
        this.name = name;
        this.companyNumber = companyNumber;
        this.openDate = openDate;
        this.category = category;
        this.mail = mail;
        this.phone = phone;
        this.member = member;
    }

    public Company toEntity() {
        return Company.createCompany()
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
