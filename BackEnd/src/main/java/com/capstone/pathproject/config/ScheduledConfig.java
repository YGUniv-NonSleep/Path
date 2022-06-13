package com.capstone.pathproject.config;

import com.capstone.pathproject.repository.mobility.MobilityReserveRepository;
import com.capstone.pathproject.service.mobility.MobilityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;

@Configuration
@RequiredArgsConstructor
public class ScheduledConfig {

    private final MobilityService mobilityService;

    @Scheduled(fixedRate = 60000)
    public void fixedDelayJob() {
        mobilityService.manageReserves();
    }
}
