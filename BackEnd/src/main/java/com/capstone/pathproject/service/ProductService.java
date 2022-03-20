package com.capstone.pathproject.service;

import com.capstone.pathproject.domain.company.ProdBasic;
import com.capstone.pathproject.dto.ProdBasicDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.ProdBasicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProdBasicRepository prodBasicRepository;

    //ProdBasic create
    public Message<ProdBasicDTO> createBasic(ProdBasicDTO prodBasicDTO) {
        System.out.println(prodBasicDTO.toString());

        ProdBasic d = prodBasicDTO.toEntity();
        System.out.println(d.toString());

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

    public Message<ProdBasicDTO> updateBasicDetail(Long prodBasicId) {
        Optional<ProdBasic> pb = prodBasicRepository.findById(prodBasicId);
        ProdBasic rs = pb.get();

        ProdBasicDTO prodBasicDTO = ProdBasicDTO.createProdBasicDTO()
                .id(rs.getId())
                .name(rs.getName())
                .image(rs.getImage())
                .detail(rs.getDetail())
                .brand(rs.getBrand())
                .categori(rs.getCategori())
                .build();

        return Message.<ProdBasicDTO>createMessage()
                .header(StatusEnum.OK)
                .message("find Success")
                .body(prodBasicDTO)
                .build();
    }


}
