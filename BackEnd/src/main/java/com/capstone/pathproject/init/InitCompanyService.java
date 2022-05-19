package com.capstone.pathproject.init;

import com.capstone.pathproject.domain.company.CompCategory;
import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.repository.company.CompanyRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

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
                companyRepository.save(createCafe("company"+temp++, (long) i));

            }
        }
    }

    public Company createCafe(String name, Long id){
        return Company.createCompany()
                .longitude("123")
                .latitude("123")
                .thumbnail("")
                .phone("010-0000-0000")
                .name(name)
                .category(CompCategory.CAFE)
                .mail(name+"@naver.com")
                .member(memberRepository.findById(id).get())
                .build();
    }


}
