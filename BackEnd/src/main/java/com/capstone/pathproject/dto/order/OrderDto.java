package com.capstone.pathproject.dto.order;

import com.capstone.pathproject.domain.order.OrderState;
import com.capstone.pathproject.dto.member.MemberDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderDto {
    private Long id;
    private int price;
    private OrderState state;
    private MemberDto member;


}
