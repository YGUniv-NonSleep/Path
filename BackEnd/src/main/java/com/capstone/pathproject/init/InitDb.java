package com.capstone.pathproject.init;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class InitDb {

    private final InitMemberService initMemberService;

    @PostConstruct
    public void init() {
        initMemberService.dbInitMember();
    }
}
