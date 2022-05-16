package com.capstone.pathproject.dto.member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class ForgotPwDto {
    @NotBlank(message = "아이디를 입력하지 않았습니다.")
    private String loginId;
    @NotBlank(message = "전화번호를 입력하지 않았습니다.")
    private String phone;
}
