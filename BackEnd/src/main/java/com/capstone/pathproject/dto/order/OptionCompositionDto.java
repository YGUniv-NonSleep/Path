package com.capstone.pathproject.dto.order;

import com.capstone.pathproject.dto.product.DetailOptionDTO;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OptionCompositionDto {

    private Long id;
    private CompositionDto composition;
    private DetailOptionDTO detailOption;

}
