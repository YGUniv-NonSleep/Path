package com.capstone.pathproject.domain.member;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

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
    @Column(name = "member_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_type")
    private memberType type;

    @Column(name = "member_login_id")
    private String loginId;

    @Column(name = "member_pw")
    private String password;

    @Column(name = "member_mail")
    private String mail;

    @Column(name = "member_name")
    private String name;

    @Column(name = "member_phone")
    private String phone;

    @Column(name = "member_addr")
    private String addr;

    @Column(name = "MEMBER_ADDR_DETAIL")
    private String addrDetail;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_gender")
    private memberGender gender;

    @Column(name = "member_birth")
    private LocalDate birthday;

    @Column(name = "member_signup_date")
    private LocalDate signupDay;

    @Column(name = "member_account")
    private String account;

    @Column(name = "member_score")
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
