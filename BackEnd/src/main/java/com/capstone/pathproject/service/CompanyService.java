package com.capstone.pathproject.service;

import com.capstone.pathproject.dto.CompanyDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.repository.CompanyRepository;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {
    private CompanyRepository companyRepository;

    public Message<CompanyDTO> createCom(CompanyDTO companyDTO){


        return null;
    }
}
