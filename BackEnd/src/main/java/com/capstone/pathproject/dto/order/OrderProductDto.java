package com.capstone.pathproject.dto.order;


import com.capstone.pathproject.dto.product.ProductDTO;
import lombok.*;

import java.util.List;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Setter
public class OrderProductDto {
    private int totalAmount;
    private int suppliedAmount;
    private String method;
    private Long memberId;
    private List<ProductDTO> productList;


}
