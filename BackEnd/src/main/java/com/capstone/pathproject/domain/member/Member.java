package com.capstone.pathproject.domain.member;

import com.capstone.pathproject.domain.mobility.MobilityPayment;
import com.capstone.pathproject.domain.mobility.MobilityReservation;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    @Column(name = "MEMBER_ID")
    private Long id;

    @OneToMany(mappedBy = "member")
    private List<MobilityReservation> mobilityReservations = new ArrayList<MobilityReservation>();

    @OneToMany(mappedBy = "member")
    private List<MobilityPayment> mobilityPayments = new ArrayList<MobilityPayment>();

    @Enumerated(EnumType.STRING)
    @Column(name = "MEMBER_TYPE")
    private memberType type;

    @Column(name = "MEMBER_LOGIN_ID")
    private String loginId;

    @Column(name = "MEMBER_PW")
    private String password;

    @Column(name = "MEMBER_MAIL")
    private String mail;

    @Column(name = "MEMBER_NAME")
    private String name;

    @Column(name = "MEMBER_PHONE")
    private String phone;

    @Column(name = "MEMBER_ADDR")
    private String addr;

    @Column(name = "MEMBER_ADDR_DETAIL")
    private String addrDetail;

    @Enumerated(EnumType.STRING)
    @Column(name = "MEMBER_GENDER")
    private memberGender gender;

    @Column(name = "MEMBER_BIRTH")
    private LocalDate birthday;

    @Column(name = "MEMBER_SIGNUP_DATE")
    private LocalDate signupDay;

    @Column(name = "MEMBER_ACCOUNT")
    private String account;

    @Column(name = "MEMBER_SCORE")
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
