package com.capstone.pathproject.dto.rest.tmap.path;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@NoArgsConstructor
public class WalkPathDto {
    private List<Features> features;
}
