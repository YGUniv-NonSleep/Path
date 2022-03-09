package com.capstone.pathproject.dto;


import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.memberGender;
import com.capstone.pathproject.domain.member.memberType;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberDTO {
    private memberType type;
    private String loginId;
    private String password;
    private String mail;
    private String name;
    private String phone;
    private String addr;
    private String addrDetail;
    private memberGender gender;
    private String birthday;
    private String account;

    @Builder(builderMethodName = "createMemberDTO")
    public MemberDTO(memberType type, String loginId, String password, String mail, String name,
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
        this.birthday = birthday;
        this.account = account;
    }

    public Member toEntity() {
        return Member.createMember()
                .type(type)
                .loginId(loginId)
                .password(password)
                .mail(mail)
                .name(name)
                .phone(phone)
                .addr(addr)
                .addrDetail(addrDetail)
                .gender(gender)
                .birthday(birthday)
                .account(account)
                .build();
    }
}
