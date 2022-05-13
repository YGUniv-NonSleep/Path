package com.capstone.pathproject.init;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class InitDb {

    private final InitMemberService initMemberService;
    private final InitMobilityService initMobilityService;
    private final InitMobilityCompanyService initMobilityCompanyService;

    @PostConstruct
    public void init() {
        initMemberService.dbInitMember();
        initMobilityCompanyService.dbInitMobilityCompany();
        initMobilityService.dbInitMobility();
    }
}