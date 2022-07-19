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

    @GetMapping("/list/{carPostId}")
    public ResponseEntity<Message<?>> carPostIdFinding(@PathVariable("carPostId") Long carPostId){
        Message<OperationDetailDto> message = operationService.getListDetail(carPostId);
        return responseUtil.createResponseEntity(message);
    }

    @GetMapping("/{operId}")
    public ResponseEntity<Message<?>> getListDetail(@PathVariable("operId") Long operId){
        Message<OperationDetailDto> message = operationService.listDetail(operId);
        return responseUtil.createResponseEntity(message);
    }

    @GetMapping("/myoperation/{memberId}")
    public ResponseEntity<Message<?>> getList(@PathVariable("memberId") Long memberId){
        Message<List<OperationDetailDto>> message = operationService.getList(memberId);
        return responseUtil.createResponseEntity(message);
    }
}
