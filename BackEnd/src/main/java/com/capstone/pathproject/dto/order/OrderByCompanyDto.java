package com.capstone.pathproject.dto.order;

import com.capstone.pathproject.domain.order.OrderState;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderByCompanyDto {
    private Long orderId;
    private Long companyId;
    private Long memberId;
    private String companyName;
    private String productName;
    private String request;
    private OrderState orderState;
    private int price;

    public OrderByCompanyDto(Long orderId, Long companyId, Long memberId, String companyName, String request, OrderState orderState, int price) {
        this.orderId = orderId;
        this.companyId = companyId;
        this.memberId = memberId;
        this.companyName = companyName;
        this.request = request;
        this.orderState = orderState;
        this.price = price;
    }
}
