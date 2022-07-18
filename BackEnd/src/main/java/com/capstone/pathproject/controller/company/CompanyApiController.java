package com.capstone.pathproject.controller.company;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.company.CompMemberDTO;
import com.capstone.pathproject.dto.company.CompanyDTO;
import com.capstone.pathproject.dto.company.FindCompanyDto;
import com.capstone.pathproject.dto.company.LocationDto;
import com.capstone.pathproject.dto.member.MemberDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.service.company.CompanyService;
import com.capstone.pathproject.util.FileUtil;
import com.capstone.pathproject.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/company")
public class CompanyApiController {

    private final CompanyService companyService;
    private final FileUtil fileUtil;
    private final ResponseUtil responseUtil;

    @GetMapping("/myStore")
    public ResponseEntity<Message<?>> myCompany(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        System.out.println("시작");
        Member member = principalDetails.getMember();
        Message<List<CompanyDTO>> message = companyService.companyDetailByMember(member.getId());

        return responseUtil.createResponseEntity(message);
    }

    @GetMapping("/{comId}")
    public ResponseEntity<Message<?>> companyDetail(@PathVariable("comId") Long comId) {
        Message<CompanyDTO> message = companyService.companyDetail(comId);
        return responseUtil.createResponseEntity(message);
    }


    @PostMapping("/")
    public ResponseEntity<Message<?>> createCom(@Valid @RequestBody CompanyDTO companyDTO,
                                    @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Member member = principalDetails.getMember();
        MemberDto memberDto = new MemberDto(member);
        companyDTO.addMember(memberDto);
        Message<CompanyDTO> message = companyService.createCompany(companyDTO);

        return responseUtil.createResponseEntity(message);
    }

    @DeleteMapping("/{comId}")
    public Message deleteCompany(@PathVariable("comId") Long comId) {
        Message message = companyService.deleteCompany(comId);
        return message;
    }

    @PatchMapping("/")
    public ResponseEntity<Message<?>> updateCompany(@Valid @RequestBody CompanyDTO companyDTO,
                                                             @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Member member = principalDetails.getMember();
        MemberDto memberDto = new MemberDto(member);
        companyDTO.addMember(memberDto);
        Message<CompanyDTO> message = companyService.updateCompany(companyDTO);
        return responseUtil.createResponseEntity(message);
    }

    @PostMapping("/member/{companyId}/{memberId}")
    public ResponseEntity<Message<?>> addCompanyMember(@PathVariable("companyId") Long companyId,
                                           @PathVariable("memberId") Long memberId) {
        Message<?> message = companyService.addCompanyMember(companyId, memberId);
        return responseUtil.createResponseEntity(message);
    }

    @GetMapping("member/{companyId}")
    public ResponseEntity<Message<?>> findCompMember(@PathVariable("companyId") Long companyId) {
        Message<List<CompMemberDTO>> message = companyService.findCompMember(companyId);
        return responseUtil.createResponseEntity(message);
    }

    @GetMapping("/search")
    public ResponseEntity<?> findCompany(
//            @ModelAttribute("locationDto") FindCompanyDto locationDto,
            @RequestParam(value = "x") List<Double> x,
            @RequestParam(value = "y") List<Double> y,
//            @RequestParam(value = "location") List<LocationDto> locationDtos,
//            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "category", required = false) String category

    ){

//        for (double a:
//             x) {
//            System.out.println(a);
//        }
//
//        System.out.println("x: "+x);
//        System.out.println("y: "+y);
//        System.out.println("loc:"+location);
//        System.out.println("cate:"+category);
        FindCompanyDto findCompanyDto = new FindCompanyDto(x,y,category);

//        System.out.println("findCompanyDto.toString() = " + findCompanyDto.toString());

        Message<?> message =  companyService.findCompany(findCompanyDto);
        System.out.println("message.getBody().toString() = " + message.getBody());

        return responseUtil.createResponseEntity(message);

//        return null;
    }


}
