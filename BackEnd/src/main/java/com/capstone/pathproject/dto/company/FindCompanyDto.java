package com.capstone.pathproject.dto.company;

import com.capstone.pathproject.domain.company.CompCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
public class FindCompanyDto {
//    private List<Double> x;
//    private List<Double> y;
    private List<LocationDto> locationList;
    private CompCategory category;

    public void setLocationList(List<LocationDto> locationList) {
        this.locationList = locationList;
    }

    public void setCategory(String category) {
        this.category = CompCategory.valueOf(category);
    }

    public FindCompanyDto(List<Double> xList, List<Double> yList , String category) {

        ArrayList<LocationDto> arrayList = new ArrayList<>();

        for (int i = 0; i < xList.size() ; i++) {
            LocationDto locationDto =new LocationDto(xList.get(i), yList.get(i));

            arrayList.add(locationDto);
        }

        this.locationList = arrayList;
        this.category = CompCategory.valueOf(category);
    }
}
