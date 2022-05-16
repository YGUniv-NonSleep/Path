package com.capstone.pathproject.dto.rest.odsay.path;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor
public class SubPath {
    private int trafficType;
    private int sectionTime;
    private double distance;
    private String startName;
    private Double startX;
    private Double startY;
    private String endName;
    private Double endX;
    private Double endY;
}
