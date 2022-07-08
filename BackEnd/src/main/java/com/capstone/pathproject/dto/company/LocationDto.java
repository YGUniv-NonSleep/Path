package com.capstone.pathproject.dto.company;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@Setter
public class LocationDto {
    private double x;
    private double y;






    public LocationDto(Double x, Double y) {
        this.x = x;
        this.y = y;
    }
}
