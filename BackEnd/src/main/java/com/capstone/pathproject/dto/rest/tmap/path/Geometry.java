package com.capstone.pathproject.dto.rest.tmap.path;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
public class Geometry {
    private String type;
    private List coordinates = new ArrayList<>();
}
