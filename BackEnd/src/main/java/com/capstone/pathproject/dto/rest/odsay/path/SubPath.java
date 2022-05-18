package com.capstone.pathproject.dto.rest.odsay.path;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
public class SubPath {
    private int trafficType;
    private int sectionTime;
    private int stationCount;
    private double distance;
    private String startName;
    private Double startX;
    private Double startY;
    private String endName;
    private Double endX;
    private Double endY;
    private PassStopList passStopList;

    @Getter
    @ToString
    @NoArgsConstructor
    public static class PassStopList {
        private final List<Stations> stations = new ArrayList<>();

        @Getter
        @ToString
        @NoArgsConstructor
        public static class Stations {
            private String stationName;
        }
    }


}
