package com.capstone.pathproject.service;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.CompanyDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.CompanyRepository;
import com.capstone.pathproject.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    private final MemberRepository memberRepository;

    public Message<CompanyDTO> createCom(CompanyDTO companyDTO){
        //Optional<Member> member = memberRepository.findById(companyDTO.getMemberId());
        System.out.println(companyDTO.toString());
        companyRepository.save(companyDTO.toEntity());
        return Message.<CompanyDTO>createMessage()
                .header(StatusEnum.OK)
                .message("SUC")
                .body(companyDTO).build();
    }
}
