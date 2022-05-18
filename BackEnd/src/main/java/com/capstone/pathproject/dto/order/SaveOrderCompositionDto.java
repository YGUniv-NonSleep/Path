package com.capstone.pathproject.dto.order;

import com.capstone.pathproject.dto.product.DetailOptionDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@NoArgsConstructor
@Setter
public class SaveOrderCompositionDto {
    private Long productId;
    private int quantity;
    private int price;
    private List<Long> detailOptionList;

}
