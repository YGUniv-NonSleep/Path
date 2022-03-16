package com.capstone.pathproject.service;


import com.capstone.pathproject.domain.carpool.CarPoolPost;
import com.capstone.pathproject.dto.CarPoolPostDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.CarPoolPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CarPoolPostService {

    private final CarPoolPostRepository carPoolPostRepository;

    @Transactional
    public Message<CarPoolPostDTO> create(CarPoolPostDTO carPoolPostDTO){
        String isEmptyCarPoolPostDTOResult = isEmptyCarPoolPostDTO(carPoolPostDTO);
        if(!isEmptyCarPoolPostDTOResult.equals("notEmpty")){
            return Message.<CarPoolPostDTO>createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message(isEmptyCarPoolPostDTOResult)
                    .body(carPoolPostDTO).build();
        }else {
            carPoolPostRepository.save(carPoolPostDTO.toEntity());
            return Message.<CarPoolPostDTO>createMessage()
                    .header(StatusEnum.OK)
                    .message("등록완료")
                    .body(carPoolPostDTO).build();
        }
    }


    private String isEmptyCarPoolPostDTO(CarPoolPostDTO carPoolPostDTO){
        if(carPoolPostDTO.getTitle().isEmpty()){return "제목을 입력하세요";}
        if(carPoolPostDTO.getContent().isEmpty()){return "본문을 입력하세요";}
        return "notEmpty";
    }
}
