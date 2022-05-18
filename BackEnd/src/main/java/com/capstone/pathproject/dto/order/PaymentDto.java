package com.capstone.pathproject.dto.order;


import com.capstone.pathproject.domain.order.OrderState;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaymentDto {

    private Long id;
    private String paymentKey;
    private String price;
    private String method;
    private OrderState state;
    private OrderDto order;

}
