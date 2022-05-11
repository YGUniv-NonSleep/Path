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
    private static class Result {
        private final List<Lane> lane = new ArrayList<>();
        private Boundary boundary;
    }

    public List<Lane> getLane() {
        return result.getLane();
    }

    public Boundary getBoundary() {
        return result.getBoundary();
    }

    public GraphPos getFirstGraphPos() {
        List<GraphPos> graphPos = result.getLane().get(0).getSection().get(0).getGraphPos();
        return graphPos.get(0);
    }

    public GraphPos getLastGraphPos() {
        int laneSize = result.getLane().size();
        Lane lastLane = result.getLane().get(laneSize - 1);
        int sectionSize = lastLane.getSection().size();
        List<GraphPos> graphPos = lastLane.getSection().get(sectionSize - 1).getGraphPos();
        int graphPosSize = graphPos.size();
        return graphPos.get(graphPosSize - 1);
    }
}
