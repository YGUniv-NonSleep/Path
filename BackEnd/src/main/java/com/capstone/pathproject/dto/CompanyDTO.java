package com.capstone.pathproject.dto;

import com.capstone.pathproject.domain.company.CompCategory;
import com.capstone.pathproject.domain.member.Member;
import lombok.Builder;

import javax.persistence.*;
import java.time.LocalDate;

public class CompanyDTO {
    private String name;
    private String companyNumber;
    private LocalDate openDate;
    private CompCategory category;
    private String mail;
    private String phone;
    private Member memberId;

    @Builder(buildMethodName = "createCompanyDTD")
    public CompanyDTO(String name, String companyNumber, LocalDate openDate, CompCategory category, String mail, String phone, Member memberId ){
        this.name = name;
        this.companyNumber = companyNumber;
        this.openDate = openDate;
        this.category = category;
        this.mail = mail;
        this. phone = phone;
        this.memberId = memberId;
    }

}
