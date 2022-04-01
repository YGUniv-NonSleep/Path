package com.capstone.pathproject.service;

import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.dto.company.CompanyDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.CompanyRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

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

    public Message<CompanyDTO> companyDetailByMember(Long memId){

        List<Company> result = companyRepository.findByMemberId(memId);

        ArrayList<CompanyDTO> rs = new ArrayList<>();

       result.stream().map(c -> c.toDTO()).forEach(s-> rs.add(s));

        for(CompanyDTO c : rs) {
            System.out.println(c);
      }
//
//        while (){
//            System.out.println("1");
//        }

        System.out.println(result.get(0));

        return null;
    }
}





