package com.capstone.pathproject.controller;


import com.capstone.pathproject.domain.carpool.Vehicle;
import com.capstone.pathproject.dto.VehicleDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.VehicleRepository;
import com.capstone.pathproject.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicle")
@RequiredArgsConstructor
public class VehicleAPIController {
    private final VehicleService vehicleService;

    @PostMapping("/save")
    public ResponseEntity<Message<VehicleDTO>> create(@RequestBody VehicleDTO vehicleDTO){
        Message<VehicleDTO> message = vehicleService.create(vehicleDTO);
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;
        if(message.getHeader() == StatusEnum.BAD_REQUEST){
            status = HttpStatus.BAD_REQUEST;
        }else if(message.getHeader() == StatusEnum.NOT_FOUND){
            status = HttpStatus.NOT_FOUND;
        }else if(message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(message,headers,status);
    }

    @PatchMapping("/update")
    public ResponseEntity<Message<VehicleDTO>> update(@RequestBody VehicleDTO vehicleDTO){
        Message<VehicleDTO> message = vehicleService.update(vehicleDTO);
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;
        if(message.getHeader() == StatusEnum.BAD_REQUEST){
            status = HttpStatus.BAD_REQUEST;
        }else if(message.getHeader() == StatusEnum.NOT_FOUND){
            status = HttpStatus.NOT_FOUND;
        }else if(message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(message,headers,status);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Message<VehicleDTO>> delete(@RequestParam("vehicleId") Long vehicleId){
        Message<VehicleDTO> message = vehicleService.delete(vehicleId);
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;
        if(message.getHeader() == StatusEnum.BAD_REQUEST){
            status = HttpStatus.BAD_REQUEST;
        }else if(message.getHeader() == StatusEnum.NOT_FOUND){
            status = HttpStatus.NOT_FOUND;
        }else if(message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(message,headers,status);
    }
}
