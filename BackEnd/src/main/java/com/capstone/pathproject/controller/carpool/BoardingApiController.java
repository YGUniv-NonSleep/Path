package com.capstone.pathproject.controller.carpool;


import com.capstone.pathproject.domain.carpool.BoardingDetail;
import com.capstone.pathproject.dto.carpool.BoardingDetailDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.carpool.BoardingService;
import com.capstone.pathproject.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/list")
    public ResponseEntity<Message<?>> getList(){
        Message<List<BoardingDetail>> message = boardingService.getList();
        return responseUtil.createResponseEntity(message);
    }

    @GetMapping("/list/{boardId}")
    public ResponseEntity<Message<?>> getListDetail(@PathVariable("boardId")Long boardId){
     Message<BoardingDetail> message = boardingService.getListDetail(boardId);
     return responseUtil.createResponseEntity(message);
    }

}
