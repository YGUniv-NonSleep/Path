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

    @GetMapping("/list/{operationId}")
    public ResponseEntity<Message<?>> getListDetail(@PathVariable("operationId") Long operationId){
        Message<OperationDetailDto> message = operationService.getListDetail(operationId);
        return responseUtil.createResponseEntity(message);
    }

    @GetMapping("/list")
    public ResponseEntity<Message<?>> getList(){
        Message<List<OperationDetail>> message = operationService.getList();
        return responseUtil.createResponseEntity(message);
    }
}
