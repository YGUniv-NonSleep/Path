package com.capstone.pathproject.controller;

import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.dto.company.CompanyDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.CompanyRepository;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.security.util.JwtTokenUtil;
import com.capstone.pathproject.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/company")
public class CompanyApiController {

    private final CompanyService companyService;

    @GetMapping("/store")
    public ResponseEntity myCompany() {
//        Optional<Company> company = companyRepository.findById(1L);
//        System.out.println(company.get().getCompanyNumber());
//        System.out.println("============================");
//        System.out.println(company.get().getMember().getLoginId());
//        return null;
//        //로그인 기능 추가 후 작성
         Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();


        Message<List<CompanyDTO>> message = companyService.companyDetailByMember(1L);

        return new ResponseEntity<>(message, HttpStatus.OK);

    }


    @GetMapping("/{comId}")
    public ResponseEntity<Message<CompanyDTO>> companyDetail(@PathVariable("comId") Long comId) {
        Message<CompanyDTO> message = companyService.companyDetail(comId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity createCom(@Valid @RequestBody CompanyDTO companyDTO) {
        Message<CompanyDTO> message = companyService.createCompany(companyDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{comId}")
    public Message deleteCompany(@PathVariable("comId") Long comId) {
        Message message = companyService.deleteCompany(comId);
        return message;
    }

    @PatchMapping("/update")
    public ResponseEntity<Message<CompanyDTO>> updateCompany(@RequestBody CompanyDTO companyDTO) {
        Message<CompanyDTO> message = companyService.updateCompany(companyDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


}
