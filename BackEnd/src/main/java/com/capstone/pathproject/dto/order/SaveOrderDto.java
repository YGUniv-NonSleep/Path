package com.capstone.pathproject.dto.order;


import com.capstone.pathproject.dto.product.ProductDTO;
import lombok.*;

import java.util.List;

@Getter
@ToString
@NoArgsConstructor
@Setter
public class SaveOrderDto {
    private int totalAmount;
    private int suppliedAmount;
    private String paymentKey;
    private String tossOrderId;
    private String method;
    private Long memberId;
    private String request;
    private List<SaveOrderCompositionDto> orderCompositionList;


}
