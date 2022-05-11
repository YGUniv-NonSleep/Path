package com.capstone.pathproject.dto.rest.odsay.path;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
public class Path implements Comparable<Path> {
    // pathType 1(지하철), 2(버스), 3(버스+지하철)
    private int pathType;
    private Info info;
    private final List<SubPath> subPath = new ArrayList<>();

    @Override
    public int compareTo(Path path) {
        int transCountResult = Integer.compare((this.info.getSubwayTransitCount() + this.info.getBusTransitCount()),
                (path.info.getSubwayTransitCount() + path.info.getBusTransitCount()));
        if (transCountResult == 0)
            return Integer.compare(this.info.getTotalTime(), path.info.getTotalTime());
        return transCountResult;
    }
}
