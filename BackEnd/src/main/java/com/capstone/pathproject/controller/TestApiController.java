package com.capstone.pathproject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class TestApiController {

    @GetMapping("/test")
    public HashMap<String, Object> test() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("id", 1L);
        map.put("loginId", "testLoginId");
        return map;
    }
}
