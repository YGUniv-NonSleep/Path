package com.capstone.pathproject.dto.rest.tmap.path;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class Features {
    private String type;
    private Geometry geometry;
    private Properties properties;
}
