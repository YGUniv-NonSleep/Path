package com.capstone.pathproject.dto.member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class ForgotLoginIdDto {

    @NotBlank(message = "이름을 입력하지 않았습니다.")
    private String name;
    @NotBlank(message = "메일을 입력하지 않았습니다.")
    private String mail;
}
