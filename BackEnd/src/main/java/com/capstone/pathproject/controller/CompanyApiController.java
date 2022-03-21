package com.capstone.pathproject.controller;

import com.capstone.pathproject.dto.CompanyDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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
        //System.out.println(message.getBody());
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        if (message.getHeader() == StatusEnum.BAD_REQUEST) status = HttpStatus.BAD_REQUEST;
        else if (message.getHeader() == StatusEnum.NOT_FOUND) status = HttpStatus.NOT_FOUND;
        else if (message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR) status = HttpStatus.INTERNAL_SERVER_ERROR;

        return new ResponseEntity<>(message, headers, status);
    }

    @PostMapping("/create")
    public ResponseEntity<Message<CompanyDTO>> createCom(@RequestBody CompanyDTO companyDTO){
        System.out.println(companyDTO.toString());
        Message<CompanyDTO> message = companyService.createCompany(companyDTO);
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        if (message.getHeader() == StatusEnum.BAD_REQUEST) status = HttpStatus.BAD_REQUEST;
        else if (message.getHeader() == StatusEnum.NOT_FOUND) status = HttpStatus.NOT_FOUND;
        else if (message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR) status = HttpStatus.INTERNAL_SERVER_ERROR;

        System.out.println(message);
        System.out.println(headers);
        System.out.println(status);
        return new ResponseEntity<>(message, headers, status);

    }

    @DeleteMapping("/delete")
    public Message deleteCompany(@RequestParam("comId") Long comId){
        Message message = companyService.deleteCompany(comId);
        return message;
    }

    @PatchMapping("/update")
    public ResponseEntity<Message<CompanyDTO>> updateCompany(@RequestBody CompanyDTO companyDTO){
        Message<CompanyDTO> message = companyService.updateCompany(companyDTO);
        HttpHeaders header = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        if (message.getHeader() == StatusEnum.BAD_REQUEST) status = HttpStatus.BAD_REQUEST;
        else if (message.getHeader() == StatusEnum.NOT_FOUND) status = HttpStatus.NOT_FOUND;
        else if (message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR) status = HttpStatus.INTERNAL_SERVER_ERROR;

        return new ResponseEntity<>(message,header, status);
    }






}
