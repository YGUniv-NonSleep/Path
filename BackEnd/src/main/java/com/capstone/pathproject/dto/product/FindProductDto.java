package com.capstone.pathproject.dto.product;

import com.capstone.pathproject.domain.company.CompCategory;
import com.capstone.pathproject.dto.company.LocationDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
@Setter
public class FindProductDto {
    private List<LocationDto> locationList;
    private CompCategory category;
    private String name;

    public FindProductDto(List<Double> xList, List<Double> yList , String category, String name) {

        ArrayList<LocationDto> arrayList = new ArrayList<>();

        for (int i = 0; i < xList.size() ; i++) {
            LocationDto locationDto =new LocationDto(xList.get(i), yList.get(i));

            arrayList.add(locationDto);
        }

        this.locationList = arrayList;
        this.category = CompCategory.valueOf(category);
        this.name = name;

    }
}
