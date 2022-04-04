package com.capstone.pathproject.dto.member;


import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.Role;
import com.capstone.pathproject.domain.member.memberGender;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberDTO {

    private Role role;

    @NotBlank(message = "로그인 아이디가 입력되지 않았습니다")
    private String loginId;

    @NotBlank(message = "비밀번호가 입력되지 않았습니다")
    private String password;

    @NotBlank(message = "이메일이 입력되지 않았습니다")
    @Email(message = "이메일 형식이 아닙니다!!!")
    private String mail;

    @NotBlank(message = "이름이 입력되지 않았습니다")
    private String name;

    @NotBlank(message = "전화번호가 입력되지 않았습니다")
    private String phone;

    @NotBlank(message = "주소가 입력되지 않았습니다")
    private String addr;

    @NotBlank(message = "상세주소가 입력되지 않았습니다")
    private String addrDetail;

    @NotNull(message = "성별이 입력되지 않았습니다")
    private memberGender gender;

    @NotBlank(message = "생년월일이 입력되지 않았습니다")
    private String birthday;

    private String account;

    @Builder(builderMethodName = "createMemberDTO")
    public MemberDTO(String loginId, String password, String mail, String name,
                     String phone, String addr, String addrDetail, memberGender gender, String birthday) {
        this.role = Role.ROLE_MEMBER;
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

    @Override
    public String toString() {
        return "MemberDTO{" + "\n" +
                "          role=" + role + "\n" +
                "          loginId='" + loginId + '\'' + "\n" +
                "          password='" + password + '\'' + "\n" +
                "          mail='" + mail + '\'' + "\n" +
                "          name='" + name + '\'' + "\n" +
                "          phone='" + phone + '\'' + "\n" +
                "          addr='" + addr + '\'' + "\n" +
                "          addrDetail='" + addrDetail + '\'' + "\n" +
                "          gender=" + gender + "\n" +
                "          birthday='" + birthday + '\'' + "\n" +
                "          account='" + account + '\'' + "\n" +
                '}';
    }

    public void encodePassword(String encodePassword) {
        this.password = encodePassword;
    }

    public void addAccount(String account) {
        this.account = account;
    }

    public void updateMemberRole(Role role) {
        this.role = role;
    }
}
