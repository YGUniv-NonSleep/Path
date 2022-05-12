package com.capstone.pathproject.dto.member;


import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.Role;
import com.capstone.pathproject.domain.member.MemberGender;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Getter
@ToString
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

    private int postId;

    @NotBlank(message = "주소가 입력되지 않았습니다")
    private String addr;

    private String addrDetail;

    private String addrExtra;

    @NotNull(message = "성별이 입력되지 않았습니다")
    private MemberGender gender;

    @Past
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthday;

    private String account;
    private int score;

    @Builder(builderMethodName = "createMemberDTO")
    public MemberDTO(Long id, Role role, String loginId, String password, String mail, String name, String phone, int postId, String addr, String addrDetail, String addrExtra, MemberGender gender, LocalDate birthday, String account, int score) {
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

    public Member toEntity() {
        return Member.createMember()
                .id(id)
                .role(role)
                .loginId(loginId)
                .password(password)
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

    public void changePassword(String encodePassword) {
        this.password = encodePassword;
    }

    public void addAccount(String account) {
        this.account = account;
    }

    public void changeMemberRole(Role role) {
        this.role = role;
    }

    public void changeScore(int score) {
        this.score = score;
    }
}
