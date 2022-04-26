package com.capstone.pathproject.dto.member;


import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.Role;
import com.capstone.pathproject.domain.member.memberGender;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberDTO {

    private Long id;
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

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Past
    private LocalDate birthday;

    private LocalDate signupDay;
    private String account;
    private int score;

    @Builder(builderMethodName = "createMemberDTO")
    public MemberDTO(Long id, Role role, String loginId, String password, String mail, String name, String phone, String addr, String addrDetail, memberGender gender, LocalDate birthday, LocalDate signupDay, String account, int score) {
        this.id = id;
        this.role = role;
        this.loginId = loginId;
        this.password = password;
        this.mail = mail;
        this.name = name;
        this.phone = phone;
        this.addr = addr;
        this.addrDetail = addrDetail;
        this.gender = gender;
        this.birthday = birthday;
        this.signupDay = signupDay;
        this.account = account;
        this.score = score;
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

    public void changePassword(String encodePassword) {
        this.password = encodePassword;
    }

    public void addAccount(String account) {
        this.account = account;
    }

    public void changeMemberRole(Role role) {
        this.role = role;
    }
}
