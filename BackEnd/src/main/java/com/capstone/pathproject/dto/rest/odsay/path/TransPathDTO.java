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
public class TransPathDTO {
    Result result;

    @Getter
    @ToString
    @NoArgsConstructor
    private static class Result {
        List<Path> path = new ArrayList<>();
    }

    public List<Path> getPath() {
        return result.getPath();
    }
}
