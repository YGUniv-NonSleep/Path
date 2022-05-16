package com.capstone.pathproject.controller.order;

import com.capstone.pathproject.dto.order.OrderProductDto;
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
@RequestMapping("/api")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/product")
    public ResponseEntity<Message<OrderProductDto>> orderProduct(@RequestBody OrderProductDto orderProductDto){
        Message<OrderProductDto> message = orderService.orderProduct(orderProductDto);


        return null;
    }



}
