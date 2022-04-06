package com.capstone.pathproject.controller;

import com.capstone.pathproject.dto.company.CompanyDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/company")
public class CompanyApiController {

    private final CompanyService companyService;

    @GetMapping("/myStore")
    public ResponseEntity<Message<List<CompanyDTO>>> myCompany() {

        Message<List<CompanyDTO>> message = companyService.companyDetailByMember(1L);
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
                                    HttpServletRequest httpServletRequest) {

        String fileName = file.getOriginalFilename();
        String filePath = httpServletRequest.getSession().getServletContext().getRealPath("")+ "company\\";

        try {
            file.transferTo(new File(filePath + fileName));

        }catch (Exception e){
            e.printStackTrace();
        }

        Message<CompanyDTO> message = companyService.createCompany(companyDTO,fileName);
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
                                                             HttpServletRequest httpServletRequest) {

        String fileName = file.getOriginalFilename();
        String filePath = httpServletRequest.getSession().getServletContext().getRealPath("")+ "company\\";

        try {
            file.transferTo(new File(filePath + fileName));

        }catch (Exception e){
            e.printStackTrace();
        }

        Message<CompanyDTO> message = companyService.updateCompany(companyDTO, fileName);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


}
