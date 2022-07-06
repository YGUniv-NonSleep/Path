package com.capstone.pathproject.controller.carpool;


import com.capstone.pathproject.dto.carpool.BoardingDetailDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.carpool.BoardingService;
import com.capstone.pathproject.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/boarding")
@RequiredArgsConstructor
public class BoardingApiController {
    private final BoardingService boardingService;
    private final ResponseUtil responseUtil;

    @PostMapping("")
    public ResponseEntity<Message<?>> create(@RequestBody BoardingDetailDto boardingDetailDto){
        Message<String> message = boardingService.create(boardingDetailDto);
        return responseUtil.createResponseEntity(message);
    }

}
