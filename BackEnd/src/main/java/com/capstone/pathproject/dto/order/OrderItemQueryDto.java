package com.capstone.pathproject.dto.order;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OrderItemQueryDto {
    private Long orderId;
    private String companyName;
    private String productName;
    private int productPrice;
    private int productDiscount;

    public OrderItemQueryDto(Long orderId, String companyName, String productName, int productPrice, int productDiscount) {
        this.orderId = orderId;
        this.companyName = companyName;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productDiscount = productDiscount;
    }
}
