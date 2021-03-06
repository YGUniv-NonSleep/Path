package com.capstone.pathproject.service.company;

import com.capstone.pathproject.domain.company.CompCategory;
import com.capstone.pathproject.domain.company.CompMember;
import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.company.CompMemberDTO;
import com.capstone.pathproject.dto.company.CompanyDTO;
import com.capstone.pathproject.dto.company.FindCompanyDto;
import com.capstone.pathproject.dto.company.LocationDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.company.CompMemberRepository;
import com.capstone.pathproject.repository.company.CompanyRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final CompMemberRepository compMemberRepository;

    private final MemberRepository memberRepository;

    public Message<CompanyDTO> createCompany(CompanyDTO companyDTO){
        //Optional<Member> member = memberRepository.findById(companyDTO.getMemberId());
        //System.out.println(companyDTO.toString());
        //HttpServletRequest httpServletRequest;


        companyRepository.save(companyDTO.toEntity());
        return Message.<CompanyDTO>builder()
                .header(StatusEnum.OK)
                .message("Create Success")
                .body(companyDTO)
                .build();
    }

    public Message deleteCompany(Long comId){
        companyRepository.deleteById(comId);
        return Message.builder()
                .header(StatusEnum.OK)
                .message("Delete Success")
                .build();
    }

    public Message<CompanyDTO> updateCompany(CompanyDTO companyDTO) {
        companyRepository.save(companyDTO.toEntity());

        return Message.<CompanyDTO>builder()
                .header(StatusEnum.OK)
                .message("Update Success")
                .body(companyDTO)
                .build();
    }

    public Message<CompanyDTO> companyDetail(Long companyId) {
        Optional<Company> findCompany =  companyRepository.findById(companyId);

        if (findCompany.isPresent()){
            Company result = findCompany.get();
//            CompanyDTO companyDTO = result.toDTO();
            CompanyDTO companyDTO = new CompanyDTO(result);

            return Message.<CompanyDTO>builder()
                    .header(StatusEnum.OK)
                    .message("find Success")
                    .body(companyDTO)
                    .build();
        }else{
            return Message.<CompanyDTO>builder()
                    .header(StatusEnum.NOT_FOUND)
                    .message("????????? ??????")
                    .build();
        }
    }

    public Message<List<CompanyDTO>> companyDetailByMember(Long memId){
        List<Company> result = companyRepository.findByMemberId(memId);
        ArrayList<CompanyDTO> companyDTOList = new ArrayList<>();
        result.stream().map(company -> new CompanyDTO(company)).forEach(companyDTO -> companyDTOList.add(companyDTO));
        return Message.<List<CompanyDTO>>builder()
                .message("?????? ?????? ??????")
                .body(companyDTOList)
                .header(StatusEnum.OK)
                .build();
    }

    public Message addCompanyMember(Long companyId, Long memberId) {
        Optional<Company> company =  companyRepository.findByIdAndMemberId(companyId,memberId);

        if (company.isPresent()){
            System.out.println(company.get().toString());
            Optional<Member> member = memberRepository.findById(memberId);
            CompMember compMember = CompMember.createCompMember()
                    .member(member.get())
                    .company(company.get())
                    .build();

            CompMemberDTO compMemberDTO = compMember.toDTO();
            compMemberRepository.save(compMember);

            return Message.builder()
                    .message("???????????? ?????? ??????")
                    .body(compMemberDTO)
                    .header(StatusEnum.OK)
                    .build();
        }else{
            System.out.println("??????!!!");
            return Message.builder()
                    .message("???????????? ?????? ??????")
                    .body(null)
                    .header(StatusEnum.NOT_FOUND)
                    .build();
        }
    }

    public Message<List<CompMemberDTO>> findCompMember(Long companyId){

        List<CompMember> compMemberList = compMemberRepository.findByCompanyId(companyId);

        ArrayList<CompMemberDTO> compMemberDTOList = new ArrayList<>();
        compMemberList.stream().map(compMember -> compMember.toDTO()).forEach(compMemberDTO -> compMemberDTOList.add(compMemberDTO));

        for (  CompMemberDTO s: compMemberDTOList) {
            System.out.println( s.toString() );
        }

    return Message.<List<CompMemberDTO>>builder()
            .message("?????? ??????")
            .header(StatusEnum.OK)
            .body(compMemberDTOList)
            .build();
    }


    public Message<?> findCompany(FindCompanyDto findCompanyDto) {

        System.out.println("findCompanyDto.toString() = " + findCompanyDto.toString());
        ArrayList<CompanyDTO> companyDTOArrayList = new ArrayList<>();
        List<Company> companyList = new ArrayList<>();
        if (findCompanyDto != null){

            if (findCompanyDto.getCategory() == null){
                System.out.println("findCompanyDto.getCategory() = " + findCompanyDto.getCategory());
                for (LocationDto locationDto : findCompanyDto.getLocationList()) {
                    List<Company> companies = companyRepository.findLocationCompanies(locationDto.getX(), locationDto.getY());
                    for (Company company: companies) {
                        companyList.add(company);
                    }
                }

            }else{
                for (LocationDto locationDto : findCompanyDto.getLocationList()) {
                    System.out.println("locationDto.toString() = " + locationDto.toString());
                    List<Company> companies = companyRepository.findLocationCategoryCompanies(locationDto.getX(), locationDto.getY(), findCompanyDto.getCategory());
                    for (Company company: companies) {
                        companyList.add(company);
                    }
                }
            }

            
            companyList.stream().distinct().collect(Collectors.toList());
        }else{
            companyList = companyRepository.findAll();
        }
        companyList.stream().map(CompanyDTO::new).forEach(companyDTOArrayList::add);



        return Message.<List<CompanyDTO>>builder()
                .body(companyDTOArrayList)
                .header(StatusEnum.OK)
                .message("list find success")
                .build();
    }
}





