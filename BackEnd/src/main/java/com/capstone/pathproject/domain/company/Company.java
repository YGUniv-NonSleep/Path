package com.capstone.pathproject.domain.company;


import com.capstone.pathproject.domain.member.Member;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@SequenceGenerator(
        name = "COMPANY_SEQ_GENERATOR",
        sequenceName = "COMPANY_SEQ",
        initialValue = 1, allocationSize = 1
)
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "COMP_MEMBER_SEQ_GENERATOR")
    @Column(name = "COMP_ID")
    private Long id;

    @Column(name = "COMP_NAME")
    private String name;

    @Column(name = "COMP_REG_NUM")
    private String regNum;

    @Column(name = "COMP_OPEN_DATE")
    private Date openDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "COMP_CREATE")
    private CompCategory category;

    @Column(name = "COMP_MAIL")
    private String mail;

    @Column(name = "COMP_PHONE")
    private String phone;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member memberId;

    public Company(){}

    public Company(String name){

    }

}
