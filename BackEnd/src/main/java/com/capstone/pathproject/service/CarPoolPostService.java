package com.capstone.pathproject.service;


import com.capstone.pathproject.domain.carpool.CarPoolPost;
import com.capstone.pathproject.dto.CarPoolPostDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.CarPoolPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CarPoolPostService {

    private final CarPoolPostRepository carPoolPostRepository;

    @Transactional
    public Message<CarPoolPostDTO> create(CarPoolPostDTO carPoolPostDTO) {
        String isEmptyCarPoolPostDTOResult = isEmptyCarPoolPostDTO(carPoolPostDTO);
        if (!isEmptyCarPoolPostDTOResult.equals("notEmpty")) {
            return Message.<CarPoolPostDTO>createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message(isEmptyCarPoolPostDTOResult)
                    .body(carPoolPostDTO).build();
        } else {
            carPoolPostRepository.save(carPoolPostDTO.toEntity());
            return Message.<CarPoolPostDTO>createMessage()
                    .header(StatusEnum.OK)
                    .message("등록완료")
                    .body(carPoolPostDTO).build();
        }
    }

    @Transactional
    public Message<CarPoolPostDTO> delete(Long postId) {
        Optional<CarPoolPost> result = carPoolPostRepository.findById(postId);
        Long a = result.get().getId();
        if (result.isPresent()) {
            carPoolPostRepository.deleteById(a);
        }
        return Message.<CarPoolPostDTO>createMessage()
                .header(StatusEnum.OK)
                .message("삭제완료")
                .build();
    }

    @Transactional
    public Message<CarPoolPostDTO> update(CarPoolPostDTO carPoolPostDTO) {
        Optional<CarPoolPost> result = carPoolPostRepository.findById(carPoolPostDTO.getId());
        if (result.isPresent()) {
            carPoolPostRepository.save(carPoolPostDTO.toEntity());
        }
        return Message.<CarPoolPostDTO>createMessage()
                .header(StatusEnum.OK)
                .message("업데이트 완료")
                .body(carPoolPostDTO).build();
    }

    public Message<CarPoolPostDTO> variableGet(Long postId) {
        Optional<CarPoolPost> result = carPoolPostRepository.findById(postId);
//        CarPoolPostDTO rs = CarPoolPostDTO.variableCarPoolDTO()
//                .carPoolPost(result.get())
//                .build();
        CarPoolPost bb = result.get();
        CarPoolPostDTO rs = CarPoolPostDTO.createCarPoolDTO()
                .id(bb.getId())
                .picture(bb.getPicture())
                .arrLatitude(bb.getArrLatitude())
                .arrLongitude(bb.getArrLongitude())
                .content(bb.getContent())
                .end(bb.getEnd())
                .recruit(bb.getRecruit())
                .start(bb.getStart())
                .startLatitude(bb.getStartLatitude())
                .startLongitude(bb.getStartLongitude())
                .startTime(bb.getStartTime())
                .member(bb.getMember())
                .title(bb.getTitle())
                .build();


        Message<CarPoolPostDTO> m = Message.<CarPoolPostDTO>createMessage()
                .header(StatusEnum.OK)
                .message("ok")
                .body(rs).build();

        return m;

    }


    private String isEmptyCarPoolPostDTO(CarPoolPostDTO carPoolPostDTO) {
        if (carPoolPostDTO.getTitle().isEmpty()) {
            return "제목을 입력하세요";
        }
        if (carPoolPostDTO.getContent().isEmpty()) {
            return "본문을 입력하세요";
        }
        return "notEmpty";
    }
}
