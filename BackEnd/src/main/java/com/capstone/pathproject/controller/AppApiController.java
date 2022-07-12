package com.capstone.pathproject.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class AppApiController {

    @PostMapping("/login")
    public HashMap<String, Object> test() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("id", 7L);
        map.put("loginId", "member");
        map.put("name", "김멤버");
        map.put("role", "ROLE_MEMBER");
        return map;
    }
}
