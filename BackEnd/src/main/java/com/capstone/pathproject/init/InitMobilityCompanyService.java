package com.capstone.pathproject.init;

import com.capstone.pathproject.domain.mobility.MobilityCompany;
import com.capstone.pathproject.repository.mobility.MobilityCompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
@Transactional
@RequiredArgsConstructor
public class InitMobilityCompanyService {

    private final MobilityCompanyRepository mobilityCompanyRepository;

    public void dbInitMobilityCompany() {
        for (int i = 1; i < 6; i++) {
            mobilityCompanyRepository.save(createMobilityCompany("mobilCo" + i));
        }
    }

    public MobilityCompany createMobilityCompany(String name) {
        return MobilityCompany.createMobilityCompany()
                .name(name)
                .companyNumber("사업자등록번호")
                .openDate(LocalDate.now().minusDays((int) (Math.random() * 1000)))
                .mail(name + "@naver.com")
                .ceoName(name)
                .ceoPhone("010-1234-1234")
                .unlockFee((int) (Math.random() * 1000))
                .minuteFee((int) (Math.random() * 1000))
                .build();
    }

}
