package com.capstone.pathproject.dto.rest.odsay.path;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
public class PassStopList {
    private final List<Stations> stations = new ArrayList<>();
}
