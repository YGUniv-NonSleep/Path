package com.capstone.pathproject.controller;

import com.capstone.pathproject.dto.company.CompanyDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/company")
public class CompanyApiController {

    private final CompanyService companyService;

    @GetMapping("/")
    public ResponseEntity<Message<CompanyDTO>> myCompany(){
        //로그인 기능 추가 후 작성
        //Message<CompanyDTO> message = companyService.myCompany();
        return null;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Message<CompanyDTO>> companyDetail(@PathVariable("userId") Long userId){
        Message<CompanyDTO> message = companyService.companyDetail(userId);
        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    @PostMapping("/create")
    public ResponseEntity<Message<CompanyDTO>> createCom(@RequestBody CompanyDTO companyDTO){
        System.out.println(companyDTO.toString());
        Message<CompanyDTO> message = companyService.createCompany(companyDTO);
        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    @DeleteMapping("/delete")
    public Message deleteCompany(@RequestParam("comId") Long comId){
        Message message = companyService.deleteCompany(comId);
        return message;
    }

    @PatchMapping("/update")
    public ResponseEntity<Message<CompanyDTO>> updateCompany(@RequestBody CompanyDTO companyDTO){
        Message<CompanyDTO> message = companyService.updateCompany(companyDTO);
        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }






}
