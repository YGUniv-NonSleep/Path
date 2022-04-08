package com.capstone.pathproject.repository;

import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.repository.member.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
class CompanyRepositoryTest {

    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    MemberRepository memberRepository;

    @Test
    void FK로_조회하기() throws Exception {
//        Optional<Member> member = memberRepository.findById(1L);
        List<Company> memberId = companyRepository.findByMemberId(1L);
        for(Company c : memberId) {
            System.out.println("c = " + c);
        }
    }
}