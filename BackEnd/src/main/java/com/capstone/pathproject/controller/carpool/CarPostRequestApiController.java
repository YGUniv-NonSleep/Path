package com.capstone.pathproject.controller.carpool;


import com.capstone.pathproject.dto.carpool.CarPostRequestDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.carpool.CarPostRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/request")
@RequiredArgsConstructor
public class CarPostRequestApiController {
    private final CarPostRequestService carPostRequestService;


    @PostMapping("/create")
    public ResponseEntity<Message<CarPostRequestDTO>> create(CarPostRequestDTO carPostRequestDTO){
        Message<CarPostRequestDTO> message = carPostRequestService.create(carPostRequestDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
