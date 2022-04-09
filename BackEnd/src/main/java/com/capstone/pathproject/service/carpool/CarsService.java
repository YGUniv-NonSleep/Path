package com.capstone.pathproject.service.carpool;


import com.capstone.pathproject.domain.carpool.Cars;
import com.capstone.pathproject.dto.carpool.CarPostDTO;
import com.capstone.pathproject.dto.carpool.CarsDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.carpool.CarsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CarsService {
    private final CarsRepository carsRepository;


    //CRUD
    @Transactional
    public Message<CarsDTO> create(CarsDTO carsDTO, String fileName) {
        CarsDTO result = CarsDTO.createCarsDTO()
                .id(carsDTO.getId())
                .member(carsDTO.getMember())
                .carKind(carsDTO.getCarKind())
                .carNum(carsDTO.getCarNum())
                .photoName(fileName)
                .build();
        carsRepository.save(result.toEntity());
        return Message.<CarsDTO>createMessage()
                .header(StatusEnum.OK)
                .message("등록완료")
                .body(result).build();

    }

    @Transactional
    public Message<CarsDTO> update(CarsDTO carsDTO, String fileName) {
        Optional<Cars> result = carsRepository.findById(carsDTO.getId());
        if (result.isPresent()) {
            CarsDTO updateResult = CarsDTO.createCarsDTO()
                    .id(carsDTO.getId())
                    .member(carsDTO.getMember())
                    .carKind(carsDTO.getCarKind())
                    .carNum(carsDTO.getCarNum())
                    .photoName(fileName)
                    .build();
            if (carsDTO.getMember().getId() == 1) {
                carsRepository.save(updateResult.toEntity());
                return Message.<CarsDTO>createMessage()
                        .header(StatusEnum.OK)
                        .message("업데이트 완료")
                        .body(carsDTO).build();
            }
        }
        return Message.<CarsDTO>createMessage()
                .header(StatusEnum.BAD_REQUEST)
                .message("작성자가 아닙니다")
                .build();
    }

    @Transactional
    public Message<CarsDTO> delete(Long carsId) {
        Optional<Cars> result = carsRepository.findById(carsId);
        Long rs = result.get().getId();
        if (result.isPresent()) {
            carsRepository.deleteById(rs);
        }
        return Message.<CarsDTO>createMessage()
                .header(StatusEnum.OK)
                .message("삭제완료")
                .build();
    }


    //조회
    @Transactional
    public Message<List<CarsDTO>> findview(Pageable pageable){
        List<Cars> result = carsRepository.findAll(pageable).getContent();
        ArrayList<CarsDTO> listDTO = new ArrayList<CarsDTO>();
        result.stream().map(cars -> cars.toDTO()).forEach(carsDTO -> listDTO.add(carsDTO));
        return Message.<List<CarsDTO>>createMessage()
                .header(StatusEnum.OK)
                .message("조회완료")
                .body(listDTO).build();
    }

    //차량이름으로 검색
    @Transactional
    public Message<List<CarsDTO>> search(String keyword, Pageable pageable){
        List<Cars> carsList = carsRepository.findByCarKindContaining(keyword,pageable);
        ArrayList<CarsDTO> listDTO = new ArrayList<CarsDTO>();
        carsList.stream().map(cars -> cars.toDTO()).forEach(carsDTO -> listDTO.add(carsDTO));
        return Message.<List<CarsDTO>>createMessage()
                .header(StatusEnum.OK)
                .message("검색완료")
                .body(listDTO).build();
    }

}