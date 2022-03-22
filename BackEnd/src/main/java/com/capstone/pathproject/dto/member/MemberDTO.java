package com.capstone.pathproject.dto.member;


import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.Role;
import com.capstone.pathproject.domain.member.memberGender;
import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberDTO {
    private Role role;
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
    public MemberDTO(String loginId, String password, String mail, String name,
                     String phone, String addr, String addrDetail, memberGender gender, String birthday) {
        this.role = Role.ROLE_USER;
        this.loginId = loginId;
        this.password = password;
        this.mail = mail;
        this.name = name;
        this.phone = phone;
        this.addr = addr;
        this.addrDetail = addrDetail;
        this.gender = gender;
        this.birthday = birthday;
    }

    public Member toEntity() {
        return Member.createMember()
                .role(role)
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

    public void encodePassword(String encodePassword) {
        this.password = encodePassword;
    }

    public void addAccount(String account) { this.account = account; }

    public void updateMemberRole(Role role) { this.role = role; }
}
