package com.capstone.pathproject.dto.rest.odsay.graph;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
public class Lane {

    @JsonProperty("class")
    private int classType;
    private int type;
    private final List<Section> section = new ArrayList<>();
}
