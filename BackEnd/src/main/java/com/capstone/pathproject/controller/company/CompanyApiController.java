package com.capstone.pathproject.controller.company;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.company.CompanyDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.service.company.CompanyService;
import com.capstone.pathproject.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.File;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/company")
public class CompanyApiController {

    private final CompanyService companyService;
    private final JwtTokenUtil jwtTokenUtil;

    @GetMapping("/myStore")
    public ResponseEntity myCompany(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        Message message;

        if(principalDetails != null){
            Member member = principalDetails.getMember();
            System.out.println("member = " + member);
            message = companyService.companyDetailByMember(member.getId());
        }else{
            message = Message.createMessage()
                    .header(StatusEnum.NOT_FOUND)
                    .message("로그인을 해 주세요!!")
                    .build();
        }

//        String header = request.getHeader(JwtProperties.HEADER_STRING);//access token 임
//        System.out.println("header = " + header); // "Bearer 토큰값" -> "Bearer " 잘라야 진짜 토큰값
//        String accesstoken = header.replace(JwtProperties.TOKEN_PREFIX, "");//진짜 엑세스토큰임
//        Claims body = jwtTokenUtil.getClaimsFormToken(TokenType.ACCESS_TOKEN, accesstoken);
//        System.out.println("body = " + body);
//        Object id = body.get("id");
//        System.out.println("id = " + id);
//        Object name = body.get("name");
//        System.out.println("name = " + name);
//
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        PrincipalDetails principalDetails1 = (PrincipalDetails) authentication.getPrincipal();
//        principalDetails1.getMember()
//        System.out.println("name = " + name);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }


    @GetMapping("/{comId}")
    public ResponseEntity<Message<CompanyDTO>> companyDetail(@PathVariable("comId") Long comId) {
        Message<CompanyDTO> message = companyService.companyDetail(comId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity createCom(@Valid @RequestPart(value="json") CompanyDTO companyDTO,
                                    @RequestPart(value = "picture", required = false) MultipartFile file ,
                                    HttpServletRequest httpServletRequest,
                                    @AuthenticationPrincipal PrincipalDetails principalDetails) {
        String fileName;
        if ( file != null ){
            System.out.println("파일있어!");
            fileName = file.getOriginalFilename();
            String filePath = httpServletRequest.getSession().getServletContext().getRealPath("")+ "company\\";

            try {
                file.transferTo(new File(filePath + fileName));

            }catch (Exception e){
                e.printStackTrace();
            }

        }else{
            System.out.println("파일없어!");
            fileName = "";
        }

        companyDTO.addFile(fileName);
        companyDTO.addMember(principalDetails.getMember());

        Message<CompanyDTO> message = companyService.createCompany(companyDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/{comId}")
    public Message deleteCompany(@PathVariable("comId") Long comId) {
        Message message = companyService.deleteCompany(comId);
        return message;
    }

    @PatchMapping("/")
    public ResponseEntity<Message<CompanyDTO>> updateCompany(@Valid @RequestPart(value="json") CompanyDTO companyDTO,
                                                             @RequestPart(value = "picture", required = false) MultipartFile file ,
                                                             HttpServletRequest httpServletRequest,
                                                             @AuthenticationPrincipal PrincipalDetails principalDetails) {
        String fileName;

        if ( file != null ){
            System.out.println("파일있어!");
            fileName = file.getOriginalFilename();
            String filePath = httpServletRequest.getSession().getServletContext().getRealPath("")+ "company\\";

            try {
                file.transferTo(new File(filePath + fileName));

            }catch (Exception e){
                e.printStackTrace();
            }
        }else{
            System.out.println("파일없어!");
            fileName = "";
        }

        companyDTO.addFile(fileName);
        companyDTO.addMember(principalDetails.getMember());

        Message<CompanyDTO> message = companyService.updateCompany(companyDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/member/{companyId}/{memberId}")
    public ResponseEntity addCompanyMember(@PathVariable("companyId") Long companyId,
                                             @PathVariable("memberId") Long memberId){

        Message message = companyService.addCompanyMember(companyId, memberId);

        return new ResponseEntity(message,HttpStatus.OK);
    }

}
