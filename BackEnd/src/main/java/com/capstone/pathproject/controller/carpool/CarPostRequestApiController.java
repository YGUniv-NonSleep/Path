package com.capstone.pathproject.controller.carpool;


import com.capstone.pathproject.domain.carpool.CarPostRequest;
import com.capstone.pathproject.dto.carpool.CarPostDTO;
import com.capstone.pathproject.dto.carpool.CarPostRequestCreateDto;
import com.capstone.pathproject.dto.carpool.CarPostRequestDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.carpool.CarPostRequestService;
import com.capstone.pathproject.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/request")
@RequiredArgsConstructor
public class CarPostRequestApiController {
    private final CarPostRequestService carPostRequestService;
    private final ResponseUtil responseUtil;


    @PostMapping("")
    public ResponseEntity<Message<?>> create(@Valid @RequestBody CarPostRequestCreateDto carPostRequestCreateDto){
        Message<String> message = carPostRequestService.create(carPostRequestCreateDto);
        return responseUtil.createResponseEntity(message);
    }
    @PatchMapping("/approval")
    public ResponseEntity<Message<?>> approval(@RequestBody CarPostRequestCreateDto carPostRequestCreateDto){
        Message<String> message = carPostRequestService.approval(carPostRequestCreateDto);
        return responseUtil.createResponseEntity(message);
    }

    @PatchMapping("/checkRequest")
    public ResponseEntity<Message<?>> checkRequest(@RequestBody CarPostRequestCreateDto carPostRequestCreateDto){
        Message<String> message = carPostRequestService.checkRequest(carPostRequestCreateDto);
        return responseUtil.createResponseEntity(message);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<Message<?>> requestFind(@PathVariable("memberId")Long memberId){
        Message<List<CarPostRequestDTO>> message = carPostRequestService.requestFind(memberId);
        return responseUtil.createResponseEntity(message);
    }

    @GetMapping("/sending/{memberId}")
    public ResponseEntity<Message<?>> sendingFind(@PathVariable("memberId") Long memberId){
        Message<List<CarPostRequestDTO>> message = carPostRequestService.sendingFind(memberId);
        return responseUtil.createResponseEntity(message);
    }

    @GetMapping("/confirm/{postId}")
    public ResponseEntity<Message<?>> confirmRequest(@PathVariable("postId") Long postId){
        Message<CarPostRequest> message = carPostRequestService.confirm(postId);
        return responseUtil.createResponseEntity(message);
    }

    @GetMapping("/conts/{requestId}")
    public ResponseEntity<Message<?>> findList(@PathVariable("requestId") Long requestId){
        Message<CarPostRequestDTO> message = carPostRequestService.findList(requestId);
        return responseUtil.createResponseEntity(message);
    }

}
