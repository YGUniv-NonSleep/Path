package com.capstone.pathproject.domain.company;


import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.memberGender;
import com.capstone.pathproject.domain.member.memberType;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

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
    @Column(name = "COMPANY_ID")
    private Long id;

    @Column(name = "COMPANY_NAME")
    private String name;

    @Column(name = "COMPANY_CRN")
    private String companyNumber;

    @Column(name = "COMPANY_OPEN_DATE")
    private LocalDate openDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "COMPANY_CREATE")
    private CompCategory category;

    @Column(name = "COMPANY_MAIL")
    private String mail;

    @Column(name = "COMPANY_PHONE")
    private String phone;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member memberId;

    public Company(){}

    @Builder(builderMethodName = "createCompany")
    public Company(Long id, String name, String companyNumber, LocalDate openDate, CompCategory category, String mail, String phone, Member memberId) {
        this.id = id;
        this.companyNumber = companyNumber;
        this.openDate = openDate;
        this.category = category;
        this.name = name;
        this.mail = mail;
        this.phone = phone;
        this.memberId = memberId;

    }

}
