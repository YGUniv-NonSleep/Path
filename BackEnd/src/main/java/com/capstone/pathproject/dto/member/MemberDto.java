package com.capstone.pathproject.dto.member;


import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.Role;
import com.capstone.pathproject.domain.member.MemberGender;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class MemberDto {

    private Long id;
    private String loginId;
    private String mail;
    private String name;
    private String phone;
    private Integer postId;
    private String addr;
    private String addrDetail;
    private String addrExtra;
    private MemberGender gender;
    private LocalDate birthday;
    private String account;
    private Integer score;

    @Builder
    public MemberDto(Long id, String loginId, String mail, String name, String phone, Integer postId, String addr, String addrDetail, String addrExtra, MemberGender gender, LocalDate birthday, String account, Integer score) {
        this.id = id;
        this.loginId = loginId;
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

    public MemberDto(Member member) {
        this.id = member.getId();
        this.loginId = member.getLoginId();
        this.mail = member.getMail();
        this.name = member.getName();
        this.phone = member.getPhone();
        this.postId = member.getPostId();
        this.addr = member.getAddr();
        this.addrDetail = member.getAddrDetail();
        this.addrExtra = member.getAddrExtra();
        this.gender = member.getGender();
        this.birthday = member.getBirthday();
        this.account = member.getAccount();
        this.score = member.getScore();
    }

    public Member toEntity() {
        return Member.builder()
                .id(id)
                .loginId(loginId)
                .mail(mail)
                .name(name)
                .phone(phone)
                .postId(postId)
                .addr(addr)
                .addrDetail(addrDetail)
                .addrExtra(addrExtra)
                .gender(gender)
                .birthday(birthday)
                .account(account)
                .score(score)
                .build();
    }
}
