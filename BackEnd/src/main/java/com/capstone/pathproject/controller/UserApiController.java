package com.capstone.pathproject.controller;

import com.capstone.pathproject.domain.user.User;
import com.capstone.pathproject.domain.user.userGender;
import com.capstone.pathproject.domain.user.userType;
import com.capstone.pathproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class UserApiController {

    private final UserService userService;

    @PostMapping("/member/signup")
    public String signup(@RequestParam("type")userType type,
                         @RequestParam("loginId") String loginId,
                         @RequestParam("password") String password,
                         @RequestParam("mail") String mail,
                         @RequestParam("name") String name,
                         @RequestParam("phone") String phone,
                         @RequestParam("addr") String addr,
                         @RequestParam("addrDetail") String addrDetail,
                         @RequestParam("gender") userGender gender,
                         @RequestParam("birthday") String birthday,
                         @RequestParam("account") String account) {
        User user = User.createUser(type, loginId, password, mail, name, phone, addr, addrDetail, gender, birthday, account);
        userService.signup(user);
        System.out.println("회원가입 완료");
        return "회원가입 완료";
    }
}
