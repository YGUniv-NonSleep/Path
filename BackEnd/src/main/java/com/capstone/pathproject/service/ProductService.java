package com.capstone.pathproject.service;

import com.capstone.pathproject.dto.ProdBasicDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.ProdBasicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    ProdBasicRepository prodBasicRepository;

    //ProdBasic create
    public Message<ProdBasicDTO> createBasic(ProdBasicDTO prodBasicDTO) {
        prodBasicRepository.save(prodBasicDTO.toEntity());
        return Message.<ProdBasicDTO>createMessage()
                .header(StatusEnum.OK)
                .message("ProdBasic Create Success")
                .body(prodBasicDTO)
                .build();
    }

    public Message deleteBasic(Long prodBasicId){
        prodBasicRepository.deleteById(prodBasicId);
        return Message.createMessage()
                .header(StatusEnum.OK)
                .message("ProdBasic delete success")
                .build();
    }

    public Message<ProdBasicDTO> updateBasic(ProdBasicDTO prodBasicDTO){
        prodBasicRepository.save(prodBasicDTO.toEntity());

        return Message.<ProdBasicDTO>createMessage()
                .header(StatusEnum.OK)
                .message("ProdBasic updeate Success")
                .body(prodBasicDTO)
                .build();
    }


}
