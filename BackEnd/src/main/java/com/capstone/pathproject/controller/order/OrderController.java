package com.capstone.pathproject.controller.order;

import com.capstone.pathproject.dto.order.SaveOrderDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/product")
    public ResponseEntity<Message<SaveOrderDto>> orderProduct(@RequestBody SaveOrderDto saveOrderDto){
        Message<SaveOrderDto> message = orderService.orderProduct(saveOrderDto);


        return null;
    }



}
