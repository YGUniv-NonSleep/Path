package com.capstone.pathproject.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@SequenceGenerator(
        name = "USER_SEQ_GENERATOR",
        sequenceName = "USER_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_SEQ_GENERATOR")
    @Column(name = "user_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type")
    private userType Type;

    @Column(name = "user_login_id")
    private String loginId;

    @Column(name = "user_pw")
    private String password;

    @Column(name = "user_mail")
    private String mail;

    @Column(name = "user_name")
    private String name;

    @Column(name = "user_phone")
    private String phone;

    @Column(name = "user_addr")
    private String addr;

    @Column(name = "user_addr_detail")
    private String addrDetail;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_gender")
    private userGender gender;

    @Temporal(TemporalType.DATE)
    @Column(name = "user_birth")
    private Date birthday;

    @Temporal(TemporalType.DATE)
    @Column(name = "user_signup_date")
    private Date signUpDay;

    @Column(name = "user_account")
    private String account;

    @Column(name = "user_score")
    private int score;


}
