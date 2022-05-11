package com.capstone.pathproject.dto.rest.odsay.path;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class Info {
    private int totalTime;
    private int payment;
    private String mapObj;
    private int busTransitCount;
    private int subwayTransitCount;
}
