package com.capstone.pathproject.dto.company;

import com.capstone.pathproject.domain.company.CompCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@NoArgsConstructor
@Setter
public class FindCompanyDto {
    private List<LocationDto> locationList;
    private CompCategory category;
}
