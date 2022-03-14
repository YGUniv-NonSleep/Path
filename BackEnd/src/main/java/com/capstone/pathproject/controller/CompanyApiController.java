package com.capstone.pathproject.controller;

import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.dto.CompanyDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/company")
public class CompanyApiController {

    private CompanyService companyService;

    @PostMapping("/create")
    public ResponseEntity<Message<CompanyDTO>> createCom(CompanyDTO companyDTO){
        Message<CompanyDTO> message = companyService.createCom(companyDTO);

        //return new ResponseEntity<>(message, headers, status);
        return null;
    }



}
