package com.capstone.pathproject.dto.rest.odsay.path;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class SubPath {
    private int trafficType;
    private int sectionTime;
    private double distance;
}
