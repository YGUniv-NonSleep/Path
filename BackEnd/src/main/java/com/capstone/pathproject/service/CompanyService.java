package com.capstone.pathproject.service;

import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.company.CompanyDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.CompanyRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    private final MemberRepository memberRepository;

    public Message<CompanyDTO> createCompany(CompanyDTO companyDTO){
        //Optional<Member> member = memberRepository.findById(companyDTO.getMemberId());
        //System.out.println(companyDTO.toString());

        companyRepository.save(companyDTO.toEntity());
        return Message.<CompanyDTO>createMessage()
                .header(StatusEnum.OK)
                .message("Create Success")
                .body(companyDTO)
                .build();
    }

    public Message deleteCompany(Long comId){
        companyRepository.deleteById(comId);
        return Message.createMessage()
                .header(StatusEnum.OK)
                .message("Delete Success")
                .build();
    }

    public Message<CompanyDTO> updateCompany(CompanyDTO companyDTO) {
        companyRepository.save(companyDTO.toEntity());
        return Message.<CompanyDTO>createMessage()
                .header(StatusEnum.OK)
                .message("Update Success")
                .body(companyDTO)
                .build();
    }

    public Message<CompanyDTO> companyDetail(Long companyId) {
        Optional<Company> findCompany =  companyRepository.findById(companyId);

        if (findCompany.isPresent()){
            Company result = findCompany.get();
            CompanyDTO companyDTO = result.toDTO();

            return Message.<CompanyDTO>createMessage()
                    .header(StatusEnum.OK)
                    .message("find Success")
                    .body(companyDTO)
                    .build();
        }else{
            return Message.<CompanyDTO>createMessage()
                    .header(StatusEnum.NOT_FOUND)
                    .message("업체가 없음")
                    .build();
        }
    }

    public Message<List<CompanyDTO>> companyDetailByMember(Long memId){

        List<Company> result = companyRepository.findByMemberId(memId);

        ArrayList<CompanyDTO> rs = new ArrayList<>();
        result.stream().map(company -> company.toDTO()).forEach(rs::add);

//        for(CompanyDTO c : rs) {
//  //          c.addMember(member.get());
//            System.out.println(c);
//      }

        return Message.<List<CompanyDTO>>createMessage()
                .message("업체 조회 성공")
                .body(rs)
                .header(StatusEnum.OK)
                .build();
    }
}





