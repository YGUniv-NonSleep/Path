package com.capstone.pathproject.domain.member;

import com.capstone.pathproject.domain.mobility.MobilityPayment;
import com.capstone.pathproject.domain.mobility.MobilityReservation;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
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

    //== 생성 메서드 ==//
    public static Member createUser(memberType type, String loginId, String password, String mail, String name,
                                    String phone, String addr, String addrDetail, memberGender gender, String birthday,
                                    String account) {
        Member member = new Member();
        member.type = type;
        member.loginId = loginId;
        member.password = password;
        member.mail = mail;
        member.name = name;
        member.phone = phone;
        member.addr = addr;
        member.addrDetail = addrDetail;
        member.gender = gender;
        member.birthday = LocalDate.parse(birthday);
        member.signupDay = LocalDate.now();
        member.account = account;
        member.score = 100;
        return member;
    }
}
