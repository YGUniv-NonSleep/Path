package com.capstone.pathproject.controller.order;

import com.capstone.pathproject.dto.order.SaveOrderDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.order.OrderService;
import com.capstone.pathproject.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;
    private final ResponseUtil responseUtil;

    @PostMapping("/product")
    public ResponseEntity<Message<?>> orderProduct(@RequestBody SaveOrderDto saveOrderDto){
        Message<SaveOrderDto> message = orderService.orderProduct(saveOrderDto);

        return responseUtil.createResponseEntity(message);
    }

    @PatchMapping("/orderState")
    public ResponseEntity<Message<?>> updateState(@RequestParam Long orderId, @RequestParam String state){

        Message<?> message = orderService.updateState(orderId, state);

        return responseUtil.createResponseEntity(message);
    }



}
