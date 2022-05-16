package com.capstone.pathproject.dto.order;

import com.capstone.pathproject.dto.product.ProductDTO;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CompositionDto {

    private Long id;
    private int quantity;
    private int price;
    private ProductDTO product;
    private OrderDto order;


}
