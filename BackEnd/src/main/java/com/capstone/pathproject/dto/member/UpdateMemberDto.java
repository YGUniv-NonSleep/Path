package com.capstone.pathproject.dto.member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateMemberDto {
    private String mail;
    private String phone;
    private int postId;
    private String addr;
    private String addrDetail;
    private String addrExtra;
}
