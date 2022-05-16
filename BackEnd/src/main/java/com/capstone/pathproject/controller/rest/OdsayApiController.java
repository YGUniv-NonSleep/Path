package com.capstone.pathproject.controller.rest;

import com.capstone.pathproject.service.rest.OdsayService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/odsay")
public class OdsayApiController {

    private final OdsayService odsayService;

    @GetMapping("/paths")
    public List<Map<String, Object>> getPaths(@RequestParam String sx,
                                              @RequestParam String sy,
                                              @RequestParam String ex,
                                              @RequestParam String ey) throws JsonProcessingException {
        return odsayService.transPaths(sx, sy, ex, ey);
    }

    @GetMapping("/paths/mobilities")
    public List<Map<String, Object>> getPathsWithMobility(@RequestParam String sx,
                                                          @RequestParam String sy,
                                                          @RequestParam String ex,
                                                          @RequestParam String ey,
                                                          @RequestParam Long mobilityId) throws JsonProcessingException {
        return odsayService.transPathsWithMobility(sx, sy, ex, ey, mobilityId);
    }
}
