package com.capstone.pathproject.controller.rest;

import com.capstone.pathproject.service.rest.TmapService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/tmap")
public class TmapApiController {

    private final TmapService tmapService;

    // 도보 경로 길찾기 (속력 지정 가능)
    @GetMapping("/path")
    public String walkPath(@RequestParam double sx,
                           @RequestParam double sy,
                           @RequestParam double ex,
                           @RequestParam double ey,
                           @RequestParam int speed) {
        return tmapService.walkPath(sx, sy, ex, ey, speed);
    }

    // 모빌리티만 사용하는 경로 길찾기
    @GetMapping("/path/mobility")
    public Map<String, Object> mobilityPath(@RequestParam double sx,
                                            @RequestParam double sy,
                                            @RequestParam double ex,
                                            @RequestParam double ey,
                                            @RequestParam Long mobilityId) throws JsonProcessingException {
        return tmapService.mobilityPath(sx, sy, ex, ey, mobilityId);
    }

    // 자동차 경로
    @GetMapping("/path/car")
    public String carPath(@RequestParam double sx,
                          @RequestParam double sy,
                          @RequestParam double ex,
                          @RequestParam double ey) {
        return tmapService.carPath(sx, sy, ex, ey);
    }
}
