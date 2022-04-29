package com.capstone.pathproject.service.carpool;


import com.capstone.pathproject.domain.carpool.CarPost;
import com.capstone.pathproject.dto.carpool.CarPostDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.carpool.CarPostRepository;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CarPostService {
    private final CarPostRepository carPostRepository;

//CRUD
    @Transactional
    public Message<CarPostDTO> create(CarPostDTO carPostDTO, String fileName, @AuthenticationPrincipal PrincipalDetails principalDetails){
        CarPostDTO result = CarPostDTO.createCarPostDTO()
                .id(carPostDTO.getId())
                .member(principalDetails.getMember())
                .cars(carPostDTO.getCars())
                .title(carPostDTO.getTitle())
                .content(carPostDTO.getContent())
                .photoName(fileName)
                .arriveLongitude(carPostDTO.getArriveLongitude())
                .arriveLatitude(carPostDTO.getArriveLatitude())
                .sdate(carPostDTO.getSdate())
                .edate(carPostDTO.getEdate())
                .recruit(carPostDTO.getRecruit())
                .stime(carPostDTO.getStime())
                .startLongitude(carPostDTO.getStartLongitude())
                .startLatitude(carPostDTO.getStartLatitude())
                .build();
        carPostRepository.save(result.toEntity());
        return Message.<CarPostDTO>createMessage()
                .header(StatusEnum.OK)
                .message("등록완료")
                .body(result).build();
    }

    @Transactional
    public Message<CarPostDTO> update(CarPostDTO carPostDTO, String fileName){
        Optional<CarPost> result = carPostRepository.findById(carPostDTO.getId());
        if(result.isPresent()){
            CarPostDTO updateResult = CarPostDTO.createCarPostDTO()
                    .id(carPostDTO.getId())
                    .member(carPostDTO.getMember())
                    .cars(carPostDTO.getCars())
                    .title(carPostDTO.getTitle())
                    .content(carPostDTO.getContent())
                    .startLatitude(carPostDTO.getStartLatitude())
                    .startLongitude(carPostDTO.getStartLongitude())
                    .arriveLongitude(carPostDTO.getArriveLongitude())
                    .arriveLatitude(carPostDTO.getArriveLatitude())
                    .sdate(carPostDTO.getSdate())
                    .edate(carPostDTO.getEdate())
                    .photoName(fileName)
                    .recruit(carPostDTO.getRecruit())
                    .stime(carPostDTO.getStime())
                    .build();
            if(carPostDTO.getMember().getId() == 1){
                carPostRepository.save(updateResult.toEntity());
                return Message.<CarPostDTO>createMessage()
                        .header(StatusEnum.OK)
                        .message("업데이트 완료")
                        .body(carPostDTO).build();
            }
        }
        return Message.<CarPostDTO>createMessage()
                .header(StatusEnum.BAD_REQUEST)
                .message("작성자가 아닙니다")
                .build();
    }

    @Transactional
    public Message<CarPostDTO> delete(Long postId){
        Optional<CarPost> result = carPostRepository.findById(postId);
        Long rs = result.get().getId();
        if(result.isPresent()){
            if(result.get().getMember().getId() == 1){
                carPostRepository.deleteById(rs);
                return Message.<CarPostDTO>createMessage()
                        .header(StatusEnum.OK)
                        .message("삭제완료")
                        .build();
            }
        }
        return Message.<CarPostDTO>createMessage()
                .header(StatusEnum.BAD_REQUEST)
                .message("작성자가 아닙니다!")
                .build();
    }

    //조회
    @Transactional
    public Message<List<CarPostDTO>> getPostList(Pageable pageable){
        List<CarPost> result = carPostRepository.findAll(pageable).getContent();
        ArrayList<CarPostDTO> listPDT = new ArrayList<CarPostDTO>();
        result.stream().map(carPost -> carPost.toDTO()).forEach(carPostDTO -> listPDT.add(carPostDTO));
        return Message.<List<CarPostDTO>>createMessage()
                .header(StatusEnum.OK)
                .message("조회완료")
                .body(listPDT).build();
    }

    @Transactional
    public Message<List<CarPostDTO>> search(String keyword, Pageable pageable){
        List<CarPost> carpostList = carPostRepository.findByTitleContaining(keyword,pageable);
        ArrayList<CarPostDTO> listPDT = new ArrayList<CarPostDTO>();
        carpostList.stream().map(carPost -> carPost.toDTO()).forEach(carPostDTO -> listPDT.add(carPostDTO));
        return Message.<List<CarPostDTO>>createMessage()
                .header(StatusEnum.OK)
                .message("검색완료")
                .body(listPDT).build();
    }

}
