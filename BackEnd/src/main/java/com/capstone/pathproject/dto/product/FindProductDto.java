package com.capstone.pathproject.dto.product;

import com.capstone.pathproject.domain.company.CompCategory;
import com.capstone.pathproject.dto.company.LocationDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@NoArgsConstructor
@Setter
public class FindProductDto {
    private List<LocationDto> locationList;
    private CompCategory category;
    private String name;
}
