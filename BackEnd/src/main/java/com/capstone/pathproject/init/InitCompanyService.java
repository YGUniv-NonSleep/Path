package com.capstone.pathproject.init;

import com.capstone.pathproject.domain.company.CompCategory;
import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.repository.company.CompanyRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;

@Component
@Transactional
@RequiredArgsConstructor
public class InitCompanyService {

    private final CompanyRepository companyRepository;
    private final MemberRepository memberRepository;

    public void dbInitCompany(){

        int temp = 0;

        for (int i = 1; i<=5 ; i++){
            for (int j = 0; j<=5 ; j++){
                System.out.println("!!!"+i);
                companyRepository.save(createCafe("company"+temp++, (long) i,(long)j) );

            }
        }
    }
    int t = 0;
    public Company createCafe(String name, Long id, Long coId){
        return Company.createCompany()
                .longitude(35.89910941386297 + 0.001*t++ )
                .latitude(128.62159611841497 + 0.001*t++ )
                .thumbnail("blankImage")
                .phone("010-0000-0000")
                .name(name)
                .category(CompCategory.CAFE)
                .mail(name+"@naver.com")
                .addr("주소")
                .addrDetail("상세주소")
                .open(LocalTime.of(9,10))
                .close(LocalTime.of(20,30))
                .member(memberRepository.findById(id).get())
                .build();
    }


}
