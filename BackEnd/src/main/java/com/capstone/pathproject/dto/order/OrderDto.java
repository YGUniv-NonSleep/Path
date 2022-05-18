package com.capstone.pathproject.dto.order;

import com.capstone.pathproject.domain.order.Order;
import com.capstone.pathproject.domain.order.OrderState;
import com.capstone.pathproject.dto.member.MemberDto;
import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderDto {

    private Long id;
    private int price;
    private OrderState state;
    private Long memberId;

    @Builder(builderMethodName = "createOrderDto")
    public OrderDto(Long id, int price, OrderState state, Long memberId){
        this.id = id;
        this.memberId = memberId;
        this.price = price;
        this.state = state;
    }

}
