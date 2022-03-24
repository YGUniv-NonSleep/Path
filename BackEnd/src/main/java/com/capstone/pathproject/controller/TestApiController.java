package com.capstone.pathproject.controller;

import java.util.Date;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestApiController {

    @GetMapping("/test")
    public String time() {
        return "현재 서버의 시간은 " + new Date() + " 입니다!";
    }

    @PostMapping("/test")
    public String postTest() {
        return " 아이디 잘 받음";
    }
}
