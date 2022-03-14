package com.capstone.pathproject.domain.member;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@ToString
@SequenceGenerator(
        name = "MEMBER_SEQ_GENERATOR",
        sequenceName = "MEMBER_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MEMBER_SEQ_GENERATOR")
    @Column(name = "MEM_ID")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "MEM_TYPE")
    private memberType type;

    @Column(name = "MEM_LOGIN_ID")
    private String loginId;

    @Column(name = "MEM_PW")
    private String password;

    @Column(name = "MEM_MAIL")
    private String mail;

    @Column(name = "MEM_NAME")
    private String name;

    @Column(name = "MEM_PHONE")
    private String phone;

    @Column(name = "MEM_ADDR")
    private String addr;

    @Column(name = "MEM_ADDR_DETAIL")
    private String addrDetail;

    @Enumerated(EnumType.STRING)
    @Column(name = "MEM_GENDER")
    private memberGender gender;

    @Column(name = "MEM_BIRTH")
    private LocalDate birthday;

    @Column(name = "MEM_SIGNUP_DATE")
    private LocalDate signupDay;

    @Column(name = "MEM_ACCOUNT")
    private String account;

    @Column(name = "MEM_SCORE")
    private int score;

    @Builder(builderMethodName = "createMember")
    public Member(memberType type, String loginId, String password, String mail, String name,
                  String phone, String addr, String addrDetail, memberGender gender, String birthday,
                  String account) {
        this.type = type;
        this.loginId = loginId;
        this.password = password;
        this.mail = mail;
        this.name = name;
        this.phone = phone;
        this.addr = addr;
        this.addrDetail = addrDetail;
        this.gender = gender;
        this.signupDay = LocalDate.now();
        this.account = account;
        this.score = 100;

        if (birthday.isEmpty()) {
            this.birthday = null;
        } else {
            this.birthday = LocalDate.parse(birthday);
        }
    }
}
