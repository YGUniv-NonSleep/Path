package com.capstone.pathproject.controller.company;

import com.capstone.pathproject.domain.company.CompCategory;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.company.CompMemberDTO;
import com.capstone.pathproject.dto.company.CompanyDTO;
import com.capstone.pathproject.dto.member.MemberDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.service.company.CompanyService;
import com.capstone.pathproject.util.FileUtil;
import com.capstone.pathproject.util.JwtTokenUtil;
import com.capstone.pathproject.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/")
    public ResponseEntity<?> findCompany(@RequestParam(required = false ,value = "category") CompCategory category){


        Message<?> message =  companyService.findCompany(category);


        return responseUtil.createResponseEntity(message);
    }


}
