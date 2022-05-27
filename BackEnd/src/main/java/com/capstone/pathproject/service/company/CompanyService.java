package com.capstone.pathproject.service.company;

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
import java.util.List;
import java.util.Optional;

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
            CompanyDTO companyDTO = result.toDTO();

            return Message.<CompanyDTO>builder()
                    .header(StatusEnum.OK)
                    .message("find Success")
                    .body(companyDTO)
                    .build();
        }else{
            return Message.<CompanyDTO>builder()
                    .header(StatusEnum.NOT_FOUND)
                    .message("업체가 없음")
                    .build();
        }
    }

    public Message<List<CompanyDTO>> companyDetailByMember(Long memId){
        List<Company> result = companyRepository.findByMemberId(memId);
        ArrayList<CompanyDTO> companyDTOList = new ArrayList<>();
        result.stream().map(Company::toDTO).forEach(companyDTOList::add);
        return Message.<List<CompanyDTO>>builder()
                .message("업체 조회 성공")
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
                    .message("업체회원 추가 완료")
                    .body(compMemberDTO)
                    .header(StatusEnum.OK)
                    .build();
        }else{
            System.out.println("없어!!!");
            return Message.builder()
                    .message("업체회원 추가 실패")
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
            .message("조회 완료")
            .header(StatusEnum.OK)
            .body(compMemberDTOList)
            .build();
    }


    public Message<?> findCompany(FindCompanyDto findCompanyDto) {

        ArrayList<CompanyDTO> companyDTOArrayList = new ArrayList<>();
        List<Company> companyList = new ArrayList<>();

        if (findCompanyDto != null){

            for (LocationDto locationDto : findCompanyDto.getLocationList()) {
                List<Company> companies = companyRepository.findLocationCompanies(locationDto.getX(), locationDto.getY());

                for (Company company: companies) {
                    companyList.add(company);
                }

            }

        }else{
            companyList = companyRepository.findAll();
        }

        companyList.stream().map(company -> CompanyDTO.createCompanyDTD()
                        .thumbnail(company.getThumbnail())
                        .id(company.getId())
                        .name(company.getName())
                        .phone(company.getPhone())
                        .mail(company.getMail())
                        .longitude(company.getLongitude())
                        .latitude(company.getLatitude())
                        .category(company.getCategory())
                        .addr(company.getAddr())
                        .addrDetail(company.getAddrDetail())
                        .open(company.getOpen())
                        .close(company.getClose())
                        .build())
                .forEach(companyDTOArrayList::add);

        return Message.<List<CompanyDTO>>builder()
                .body(companyDTOArrayList)
                .header(StatusEnum.OK)
                .message(  " list find success")
                .build();
    }
}





