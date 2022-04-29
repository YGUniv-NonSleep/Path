package com.capstone.pathproject.controller.company;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.company.CompMemberDTO;
import com.capstone.pathproject.dto.company.CompanyDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.service.company.CompanyService;
import com.capstone.pathproject.util.FileUtil;
import com.capstone.pathproject.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.File;
import java.net.MalformedURLException;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/company")
public class CompanyApiController {

    private final CompanyService companyService;
    private final JwtTokenUtil jwtTokenUtil;
    private final FileUtil fileUtil;

    @GetMapping("/myStore")
    public ResponseEntity<Message<List<CompanyDTO>>> myCompany(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        System.out.println("시작");
        Member member = principalDetails.getMember();
        Message<List<CompanyDTO>> message = companyService.companyDetailByMember(member.getId());
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/{comId}")
    public ResponseEntity<Message<CompanyDTO>> companyDetail(@PathVariable("comId") Long comId) {
        Message<CompanyDTO> message = companyService.companyDetail(comId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/image")
    public ResponseEntity<String> saveImage(@RequestParam("multipartFile") MultipartFile multipartFile){

         String fileName = fileUtil.storeFile(multipartFile);
        return new ResponseEntity<>(fileName,HttpStatus.OK);
    }



    @PostMapping("/")
    public ResponseEntity createCom(@Valid @RequestBody CompanyDTO companyDTO,
                                    @AuthenticationPrincipal PrincipalDetails principalDetails) {


        companyDTO.addMember(principalDetails.getMember().toDTO());
        Message<CompanyDTO> message = companyService.createCompany(companyDTO);

//        try {
//            message = companyService.createCompany(companyDTO);
//        }catch(Exception e){
//            if (companyDTO.getThumbnail() != null){
//                File file = new File(fileUtil.getFullPath(companyDTO.getThumbnail()));
//                boolean delete = file.delete();
//            }
//        }

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/{comId}")
    public Message deleteCompany(@PathVariable("comId") Long comId) {
        Message message = companyService.deleteCompany(comId);
        return message;
    }

    @PatchMapping("/")
    public ResponseEntity<Message<CompanyDTO>> updateCompany(@Valid @RequestBody CompanyDTO companyDTO,
                                                             @AuthenticationPrincipal PrincipalDetails principalDetails) {


        companyDTO.addMember(principalDetails.getMember().toDTO());
        Message<CompanyDTO> message = companyService.updateCompany(companyDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/member/{companyId}/{memberId}")
    public ResponseEntity addCompanyMember(@PathVariable("companyId") Long companyId,
                                           @PathVariable("memberId") Long memberId) {
        Message message = companyService.addCompanyMember(companyId, memberId);
        return new ResponseEntity(message, HttpStatus.OK);
    }

    @GetMapping("member/{companyId}")
    public ResponseEntity<Message<List<CompMemberDTO>>> findCompMember(@PathVariable("companyId") Long companyId) {
        Message<List<CompMemberDTO>> message = companyService.findCompMember(companyId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
