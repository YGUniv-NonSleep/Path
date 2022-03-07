package com.capstone.pathproject.domain.user;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

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
    private userType type;

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

    @Column(name = "user_birth")
    private LocalDate birthday;

    @Column(name = "user_signup_date")
    private LocalDate signupDay;

    @Column(name = "user_account")
    private String account;

    @Column(name = "user_score")
    private int score;

    //== 생성 메서드 ==//
    public static User createUser(userType type, String loginId, String password, String mail, String name,
                                  String phone, String addr, String addrDetail, userGender gender, String birthday,
                                  String account) {
        User user = new User();
        user.type = type;
        user.loginId = loginId;
        user.password = password;
        user.mail = mail;
        user.name = name;
        user.phone = phone;
        user.addr = addr;
        user.addrDetail = addrDetail;
        user.gender = gender;
        user.birthday = LocalDate.parse(birthday);
        user.signupDay = LocalDate.now();
        user.account = account;
        user.score = 100;
        return user;
    }
}
