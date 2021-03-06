package com.capstone.pathproject.domain.member;

import com.capstone.pathproject.domain.BaseTimeEntity;
import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.domain.order.OrderItem;
import com.capstone.pathproject.dto.member.SignupFormDto;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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

    @Column(name = "MEM_ADDR")
    private String addr;

    @Column(name = "MEM_ADDR_DETAIL")
    private String addrDetail;

    @Column(name = "MEM_ADDR_EXTRA")
    private String addrExtra;

    @Column(name = "MEM_POST_ID")
    private int postId;

    @Enumerated(EnumType.STRING)
    @Column(name = "MEM_GENDER")
    private MemberGender gender;

    @Column(name = "MEM_BIRTH")
    private LocalDate birthday;

    @Column(name = "MEM_ACCOUNT")
    private String account;

    @Column(name = "MEM_SCORE")
    private int score;

    @Column(name = "MEM_PROVIDER")
    private String provider;

    @Column(name = "MEM_PROVIDER_ID")
    private String providerId;

    @Builder
    public Member(Long id, Role role, String loginId, String password, String mail, String name, String phone, int postId, String addr, String addrDetail, String addrExtra, MemberGender gender, LocalDate birthday, String account, int score, String provider, String providerId) {
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
        this.provider = provider;
        this.providerId = providerId;
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

    public void delete() {
        this.loginId = String.valueOf(loginId.substring(0, 3) + UUID.randomUUID());
        this.mail = null;
        this.name = null;
        this.phone = null;
        this.postId = 0;
        this.addr = null;
        this.addrDetail = null;
        this.addrExtra = null;
        this.gender = null;
        this.birthday = null;
        this.account = null;
        this.score = 0;
        this.provider = null;
        this.providerId = null;
    }
}
