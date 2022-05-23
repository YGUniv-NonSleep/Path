package com.capstone.pathproject.service.carpool;


import com.capstone.pathproject.dto.carpool.CarPostRequestDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.carpool.CarPostRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CarPostRequestService {
    private final CarPostRequestRepository carPostRequestRepository;


    @Transactional
    public Message<CarPostRequestDTO> create(CarPostRequestDTO carPostRequestDTO){
        CarPostRequestDTO result = CarPostRequestDTO.createRequestDTO()
                .id(carPostRequestDTO.getId())
                .member(carPostRequestDTO.getMember())
                .carPost(carPostRequestDTO.getCarPost())
                .content(carPostRequestDTO.getContent())
                .price(carPostRequestDTO.getPrice())
                .startLongitude(carPostRequestDTO.getStartLongitude())
                .startLatitude(carPostRequestDTO.getStartLatitude())
                .arriveLongitude(carPostRequestDTO.getArriveLongitude())
                .arriveLatitude(carPostRequestDTO.getArriveLatitude())
                .passenger(carPostRequestDTO.getPassenger())
                .approval(carPostRequestDTO.getApproval())
                .build();
        carPostRequestRepository.save(result.toEntity());
        return Message.<CarPostRequestDTO>builder()
                .header(StatusEnum.OK)
                .message("등록완료")
                .build();
    }
}
