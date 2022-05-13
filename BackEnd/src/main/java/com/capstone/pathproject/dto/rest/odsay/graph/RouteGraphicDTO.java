package com.capstone.pathproject.dto.rest.odsay.graph;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
public class RouteGraphicDTO {
    private Result result;

    @Getter
    @ToString
    @NoArgsConstructor
    public static class Result {
        private final List<Lane> lane = new ArrayList<>();
        private Boundary boundary;
    }
}
