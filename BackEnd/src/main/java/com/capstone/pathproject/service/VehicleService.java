package com.capstone.pathproject.service;

import com.capstone.pathproject.domain.carpool.Vehicle;
import com.capstone.pathproject.dto.VehicleDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.controller.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    @Transactional
    public Message<VehicleDTO> create(VehicleDTO vehicleDTO){
        String isEmptyVehicelDTOResult = isEmptyVehiceDTO(vehicleDTO);
        if(!isEmptyVehicelDTOResult.equals("notEmpty")){
            return Message.<VehicleDTO>createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message(isEmptyVehicelDTOResult)
                    .body(vehicleDTO).build();
        }else {
            vehicleRepository.save(vehicleDTO.toEntity());
            return Message.<VehicleDTO>createMessage()
                    .header(StatusEnum.OK)
                    .message("등록완료")
                    .body(vehicleDTO).build();
        }
    }

    @Transactional
    public Message<VehicleDTO> update(VehicleDTO vehicleDTO){
        Optional<Vehicle> result = vehicleRepository.findById(vehicleDTO.getId());
        if(result.isPresent()){
            vehicleRepository.save(vehicleDTO.toEntity());
        }
        return Message.<VehicleDTO>createMessage()
                .header(StatusEnum.OK)
                .message("업데이트 완료")
                .body(vehicleDTO).build();
    }

    @Transactional
    public Message<VehicleDTO> delete(Long vehicleId){
        Optional<Vehicle> result = vehicleRepository.findById(vehicleId);
        System.out.println(result);
        Long rs = result.get().getId();
        if(result.isPresent()){
            vehicleRepository.deleteById(rs);
        }
        return Message.<VehicleDTO>createMessage()
                .header(StatusEnum.OK)
                .message("삭제완료")
                .build();
    }

    public Message<VehicleDTO> variableGet(Long vehicleId){
        Optional<Vehicle> result = vehicleRepository.findById(vehicleId);
        Vehicle rsget = result.get();
        VehicleDTO rs = VehicleDTO.checkVehicleDTO()
                .id(rsget.getId())
                .member(rsget.getMember())
                .carKind(rsget.getCarKind())
                .carNum(rsget.getCarNum())
                .build();

        Message<VehicleDTO> vm = Message.<VehicleDTO>createMessage()
                .header(StatusEnum.OK)
                .message("ok")
                .body(rs).build();

        return vm;
    }





    private String isEmptyVehiceDTO(VehicleDTO vehicleDTO){
        if(vehicleDTO.getCarKind().isEmpty()){
            return "차종을 입력하세요";
        }
        if(vehicleDTO.getCarNum().isEmpty()){
            return "차량번호를 입력하세요";
        }
        return "notEmpty";
    }
}
