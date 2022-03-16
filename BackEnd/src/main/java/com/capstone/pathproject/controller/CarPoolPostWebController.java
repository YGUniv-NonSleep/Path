package com.capstone.pathproject.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class CarPoolPostWebController {
    @GetMapping("/carpost")
    public String Carpost(){
        return "carpost";
    }
}
