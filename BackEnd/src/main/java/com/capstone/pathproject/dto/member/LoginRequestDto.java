package com.capstone.pathproject.dto.member;

import lombok.*;

@Getter
@Setter
@ToString
public class LoginRequestDto {
    private String username;
    private String password;
}
