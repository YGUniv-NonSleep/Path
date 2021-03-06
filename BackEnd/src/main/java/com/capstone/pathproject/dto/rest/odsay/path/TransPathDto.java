package com.capstone.pathproject.dto.rest.odsay.path;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
public class TransPathDto {
    Result result;

    @Getter
    @ToString
    @NoArgsConstructor
    public static class Result {
        List<Path> path = new ArrayList<>();
    }
}
