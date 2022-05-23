package com.capstone.pathproject.dto.member;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.MemberGender;
import com.capstone.pathproject.domain.member.Role;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.time.LocalDate;

@Getter
@Setter
@ToString
public class SignupFormDto {

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

    public Member toEntity() {
        return Member.builder()
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
                .score(100)
                .build();
    }
}
