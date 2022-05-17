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

    @GetMapping("/path")
    public String walkPath(@RequestParam double sx,
                           @RequestParam double sy,
                           @RequestParam double ex,
                           @RequestParam double ey,
                           @RequestParam int speed) {
        return tmapService.walkPath(sx, sy, ex, ey, speed);
    }

    @GetMapping("/path/mobility")
    public Map<String, Object> mobilityPath(@RequestParam double sx,
                                            @RequestParam double sy,
                                            @RequestParam double ex,
                                            @RequestParam double ey,
                                            @RequestParam Long mobilityId) throws JsonProcessingException {
        return tmapService.mobilityPath(sx, sy, ex, ey, mobilityId);
    }


    @GetMapping("/path-middle-mobility")
    public Map<String, Object> walkToMobilPath(@RequestParam double sx,
                                               @RequestParam double sy,
                                               @RequestParam double ex,
                                               @RequestParam double ey,
                                               @RequestParam Long mobilityId) throws JsonProcessingException {
        return tmapService.walkToMobilPath(sx, sy, ex, ey, mobilityId);
    }
}
