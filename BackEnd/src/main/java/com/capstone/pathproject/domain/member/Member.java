package com.capstone.pathproject.domain.member;

import com.capstone.pathproject.domain.BaseTimeEntity;
import com.capstone.pathproject.dto.member.SignupFormDto;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@ToString
@DynamicUpdate
@SequenceGenerator(
        name = "MEMBER_SEQ_GENERATOR",
        sequenceName = "MEMBER_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverrides({
        @AttributeOverride(name = "createdDateTime", column = @Column(name = "MEM_CREATED_DATETIME")),
        @AttributeOverride(name = "updatedDateTime", column = @Column(name = "MEM_UPDATED_DATETIME"))
})
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MEMBER_SEQ_GENERATOR")
    @Column(name = "MEM_ID")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "MEM_ROLE")
    private Role role;

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

    @Column(name = "MEM_POST_ID")
    private int postId;

    @Column(name = "MEM_ADDR")
    private String addr;

    @Column(name = "MEM_ADDR_DETAIL")
    private String addrDetail;

    @Column(name = "MEM_ADDR_EXTRA")
    private String addrExtra;

    @Enumerated(EnumType.STRING)
    @Column(name = "MEM_GENDER")
    private MemberGender gender;

    @Column(name = "MEM_BIRTH")
    private LocalDate birthday;

    @Column(name = "MEM_ACCOUNT")
    private String account;

    @Column(name = "MEM_SCORE")
    private int score;

    @Builder(builderMethodName = "createMember")
    public Member(Long id, Role role, String loginId, String password, String mail, String name, String phone, int postId, String addr, String addrDetail, String addrExtra, MemberGender gender, LocalDate birthday, String account, int score) {
        this.id = id;
        this.role = role;
        this.loginId = loginId;
        this.password = password;
        this.mail = mail;
        this.name = name;
        this.phone = phone;
        this.postId = postId;
        this.addr = addr;
        this.addrDetail = addrDetail;
        this.addrExtra = addrExtra;
        this.gender = gender;
        this.birthday = birthday;
        this.account = account;
        this.score = score;
    }

    @Builder(builderMethodName = "signup")
    public Member(SignupFormDto signupFormDto) {
        this.role = signupFormDto.getRole();
        this.loginId = signupFormDto.getLoginId();
        this.password = signupFormDto.getPassword();
        this.mail = signupFormDto.getMail();
        this.name = signupFormDto.getName();
        this.phone = signupFormDto.getPhone();
        this.postId = signupFormDto.getPostId();
        this.addr = signupFormDto.getAddr();
        this.addrDetail = signupFormDto.getAddrDetail();
        this.addrExtra = signupFormDto.getAddrExtra();
        this.gender = signupFormDto.getGender();
        this.birthday = signupFormDto.getBirthday();
        this.account = "";
        this.score = 100;
    }

    public void updateMail(String mail) {
        this.mail = mail;
    }

    public void updatePhone(String phone) {
        this.phone = phone;
    }

    public void updatePost(int postId) {
        this.postId = postId;
    }

    public void updateAddr(String addr) {
        this.addr = addr;
    }

    public void updateAddrDetail(String addrDetail) {
        this.addrDetail = addrDetail;
    }

    public void updateAddrExtra(String addrExtra) {
        this.addrExtra = addrExtra;
    }

    public void updateEncodePassword(String encodePassword) {
        this.password = encodePassword;
    }


}
