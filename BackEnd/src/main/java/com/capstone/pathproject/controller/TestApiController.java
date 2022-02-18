package com.capstone.pathproject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class TestApiController {

    @GetMapping("/test")
    public String time() {
        return "현재 서버의 시간은 " + new Date() + " 입니다!";
    }

    @PostMapping("/test")
    public String postTest(@RequestParam("Id") Long Id) {
        return Id + " 아이디 잘 받음";
    }
}
