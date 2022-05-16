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
                .startLocal1(carPostDTO.getStartLocal1())
                .startLocal2(carPostDTO.getStartLocal2())
                .arriveLocal1(carPostDTO.getArriveLocal1())
                .arriveLocal2(carPostDTO.getArriveLocal2())
                .price(carPostDTO.getPrice())
                .build();
        carPostRepository.save(result.toEntity());
        return Message.<CarPostDTO>createMessage()
                .header(StatusEnum.OK)
                .message("등록완료")
                .body(result).build();
    }

    @Transactional
    public Message<CarPostDTO> update(CarPostDTO carPostDTO, String fileName, @AuthenticationPrincipal PrincipalDetails principalDetails){
        Optional<CarPost> result = carPostRepository.findById(carPostDTO.getId());
        if(result.isPresent()){
            if(carPostDTO.getMember().getLoginId().equals(principalDetails.getMember().getLoginId())){
            CarPostDTO updateResult = CarPostDTO.createCarPostDTO()
                    .id(carPostDTO.getId())
                    .member(principalDetails.getMember())
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
                    .startLocal1(carPostDTO.getStartLocal1())
                    .startLocal2(carPostDTO.getStartLocal2())
                    .arriveLocal1(carPostDTO.getArriveLocal1())
                    .arriveLocal2(carPostDTO.getArriveLocal2())
                    .price(carPostDTO.getPrice())
                    .build();
                carPostRepository.save(updateResult.toEntity());
            }else{
                return Message.<CarPostDTO>createMessage()
                        .header(StatusEnum.BAD_REQUEST)
                        .message("작성자가 아닙니다!")
                        .build();
            }
                return Message.<CarPostDTO>createMessage()
                        .header(StatusEnum.OK)
                        .message("업데이트 완료")
                        .body(carPostDTO).build();

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
    public Message viewParams(Long id){
        Optional<CarPost> carPost = carPostRepository.findById(id);
        CarPostDTO carPostDTO = carPost.get().toDTO();
        return Message.<CarPostDTO>createMessage()
                .header(StatusEnum.OK)
                .message("조회 완료")
                .body(carPostDTO).build();
    }

    @Transactional
    public Message<List<CarPostDTO>> search(String keyword,String option ,Pageable pageable){
        System.out.println(keyword);
        System.out.println(option.getClass());
        if(option.equals("1")){
            List<CarPost> carpostList = carPostRepository.findByStartLocal1Containing(keyword,pageable);

            ArrayList<CarPostDTO> listPDT = new ArrayList<CarPostDTO>();
            carpostList.stream().map(carPost -> carPost.toDTO()).forEach(carPostDTO -> listPDT.add(carPostDTO));
            return Message.<List<CarPostDTO>>createMessage()
                    .header(StatusEnum.OK)
                    .message("검색완료")
                    .body(listPDT).build();
        }else{
            List<CarPost> carpostList = carPostRepository.findByStartLocal2Containing(keyword,pageable);
            ArrayList<CarPostDTO> listPDT = new ArrayList<CarPostDTO>();
            carpostList.stream().map(carPost -> carPost.toDTO()).forEach(carPostDTO -> listPDT.add(carPostDTO));
            return Message.<List<CarPostDTO>>createMessage()
                    .header(StatusEnum.OK)
                    .message("검색완료")
                    .body(listPDT).build();
        }

    }

}
