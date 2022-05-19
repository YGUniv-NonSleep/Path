package com.capstone.pathproject.dto.rest.odsay.path;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class Lane {
    private String busNo; // 버스명 e.g. 719
    private String name; // 지하철명 e.g. 1호선
}
