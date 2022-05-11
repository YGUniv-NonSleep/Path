package com.capstone.pathproject.dto.rest.odsay.graph;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
public class Section {
    private final List<GraphPos> graphPos = new ArrayList<>();
}

