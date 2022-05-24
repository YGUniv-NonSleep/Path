package com.capstone.pathproject.dto.member;

import com.capstone.pathproject.domain.order.OrderState;
import com.capstone.pathproject.dto.order.OrderItemQueryDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class MemberPaymentDto {
    private Long paymentId; // 결제번호
    private Long orderId; // 주문번호
    private int price; // 결제금액
    private LocalDateTime paymentDate; // 결제일시
    private OrderState paymentStatus; // 결제상태
    private String method; // 결제수단
    private List<OrderItemQueryDto> orderItems;

    public MemberPaymentDto(Long paymentId, Long orderId, int price, LocalDateTime paymentDate, OrderState paymentStatus, String method) {
        this.paymentId = paymentId;
        this.orderId = orderId;
        this.price = price;
        this.paymentDate = paymentDate;
        this.paymentStatus = paymentStatus;
        this.method = method;
    }
}
