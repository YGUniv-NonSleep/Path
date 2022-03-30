package com.capstone.pathproject.domain.mobility;

import com.capstone.pathproject.repository.mobility.MobilityCompanyRepository;
import com.capstone.pathproject.repository.mobility.MobilityRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Persistence;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class MobilityCompanyTest {

    @Autowired
    MobilityCompanyRepository mobilityCompanyRepository;
    @Autowired
    MobilityRepository mobilityRepository;

    @Test
    @Transactional
    void 영속성전이And고아객체_테스트() throws Exception {
        //given
        MobilityCompany mobilityCompany = MobilityCompany.createMobilityCompany()
                .name("회사1")
                .companyNumber("회사번호")
                .openDate(LocalDate.now())
                .mail("메일@naver.com")
                .ceoName("CEO이름1")
                .ceoPhone("CEO전화번호1")
                .minuteFee("시간당요금")
                .build();
        Mobility mobility1 = Mobility.createMobility()
                .battery(100)
                .longitude("경도")
                .latitude("위도")
                .state(MobilityState.READY)
                .type(MobilityType.KICKBOARD)
                .build();
        Mobility mobility2 = Mobility.createMobility()
                .battery(100)
                .longitude("경도")
                .latitude("위도")
                .state(MobilityState.READY)
                .type(MobilityType.KICKBOARD)
                .build();
        //when
        mobilityCompany.addMobility(mobility1);
        mobilityCompany.addMobility(mobility2);
        mobilityCompanyRepository.save(mobilityCompany);
        Optional<MobilityCompany> findMobilityCompany = mobilityCompanyRepository.findById(mobilityCompany.getId());
        //then
        System.out.println("==================================================");
        System.out.println("findMobilityCompany = " + findMobilityCompany.get().getName());
        for(Mobility m : findMobilityCompany.get().getMobilities()) {
            System.out.println("mobility = " + m.getId());
        }
        System.out.println("==================================================");
        mobilityCompanyRepository.delete(mobilityCompany);
        List<Mobility> allMobility = mobilityRepository.findAll();
        System.out.println("allMobility = " + allMobility.isEmpty());
    }
}