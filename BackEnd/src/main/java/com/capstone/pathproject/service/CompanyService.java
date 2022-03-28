package com.capstone.pathproject.service;

import com.capstone.pathproject.domain.company.Company;
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

    public Message<CompanyDTO> createCompany(CompanyDTO companyDTO){
        //Optional<Member> member = memberRepository.findById(companyDTO.getMemberId());
        System.out.println(companyDTO.toString());
        companyRepository.save(companyDTO.toEntity());
        return Message.<CompanyDTO>createMessage()
                .header(StatusEnum.OK)
                .message("Create Success")
                .body(companyDTO).build();
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


    public Message<CompanyDTO> companyDetail(Long userId) {
        Optional<Company> cRs =  companyRepository.findById(userId);
        Company rs = cRs.get();

        CompanyDTO companyDto = CompanyDTO.createCompanyDTD()
                .id(rs.getId())
                .name(rs.getName())
                .companyNumber(rs.getCompanyNumber())
                .openDate(rs.getOpenDate())
                .category(rs.getCategory())
                .mail(rs.getMail())
                .phone(rs.getPhone())
                .longitude(rs.getLongitude())
                .latitude(rs.getLatitude())
                .member(rs.getMember())
                .build();

        //        CompanyDTO cd = rs.get().toDTO();
//        CompanyDTO cdd = CompanyDTO.createDTOByCompany()
//                .c(rs.get())
//                .build();

//        System.out.println(rs.get().toString());
//        System.out.println(cd.toString());
//        System.out.println(cdd.toString());

        //System.out.println(d.toString());
        //System.out.println(rs.get().getId());

        return Message.<CompanyDTO>createMessage()
                .header(StatusEnum.OK)
                .message("find Success")
                .body(companyDto)
                .build();
    }
}





