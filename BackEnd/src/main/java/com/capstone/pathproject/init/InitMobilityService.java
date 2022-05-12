package com.capstone.pathproject.init;

import com.capstone.pathproject.domain.mobility.Mobility;
import com.capstone.pathproject.domain.mobility.MobilityCompany;
import com.capstone.pathproject.domain.mobility.MobilityState;
import com.capstone.pathproject.domain.mobility.MobilityType;
import com.capstone.pathproject.repository.mobility.MobilityCompanyRepository;
import com.capstone.pathproject.repository.mobility.MobilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
@RequiredArgsConstructor
public class InitMobilityService {

    private final MobilityRepository mobilityRepository;
    private final MobilityCompanyRepository mobilityCompanyRepository;

    public void dbInitMobility() {
        MobilityCompany mobility1 = mobilityCompanyRepository.findById(1L).get();
        for (int i = 1; i < 71; i++) {
            mobilityRepository.save(createMobility(mobility1, MobilityState.READY, MobilityType.KICKBOARD));
        }
        for (int i = 1; i < 31; i++) {
            mobilityRepository.save(createMobility(mobility1, MobilityState.READY, MobilityType.BIKE));
        }
        for (int i = 1; i < 11; i++) {
            mobilityRepository.save(createMobility(mobility1, MobilityState.USING, MobilityType.KICKBOARD));
        }

        MobilityCompany mobility2 = mobilityCompanyRepository.findById(2L).get();
        for (int i = 1; i < 71; i++) {
            mobilityRepository.save(createMobility(mobility2, MobilityState.READY, MobilityType.KICKBOARD));
        }
        for (int i = 1; i < 31; i++) {
            mobilityRepository.save(createMobility(mobility2, MobilityState.READY, MobilityType.BIKE));
        }
        for (int i = 1; i < 11; i++) {
            mobilityRepository.save(createMobility(mobility2, MobilityState.USING, MobilityType.KICKBOARD));
        }
    }

    // 위도, 경도 (대구 경대 ~ 동대구역 지역범위)
    // 35.9003987, 128.5979169
    // 35.8721661, 128.6398022
    public Mobility createMobility(MobilityCompany company, MobilityState state, MobilityType type) {
        return Mobility.createMobility()
                .mobilityCompany(company)
                .battery((int) (Math.random() * 100))
                .latitude(randomLatPos(9003987, 8721661))
                .longitude(randomLongPos(6398022, 5979169))
                .state(state)
                .type(type)
                .build();
    }

    // 랜덤 위도 좌표값
    public double randomLatPos(int max, int min) {
        int range = (int) (Math.random() * (max - min + 1)) + min;
        return 35 + (range * 0.0000001);
    }

    // 랜덤 경도 좌표값
    public double randomLongPos(int max, int min) {
        int range = (int) (Math.random() * (max - min + 1)) + min;
        return 128 + (range * 0.0000001);
    }
}
