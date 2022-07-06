package com.capstone.pathproject.controller.carpool;


import com.capstone.pathproject.domain.carpool.OperationDetail;
import com.capstone.pathproject.dto.carpool.OperationDetailDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.carpool.OperationService;
import com.capstone.pathproject.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operation")
@RequiredArgsConstructor
public class OperationApiController {
    private final OperationService operationService;
    private final ResponseUtil responseUtil;

    @PostMapping("")
    public ResponseEntity<Message<?>> create(@RequestBody OperationDetailDto operationDetailDto){
        Message<String> message = operationService.create(operationDetailDto);
        return responseUtil.createResponseEntity(message);
    }

    @GetMapping("/list/{postId}")
    public ResponseEntity<Message<?>> getList(@PathVariable("postId") Long postId){
        Message<List<OperationDetailDto>> message = operationService.getList(postId);
        return responseUtil.createResponseEntity(message);
    }
}
