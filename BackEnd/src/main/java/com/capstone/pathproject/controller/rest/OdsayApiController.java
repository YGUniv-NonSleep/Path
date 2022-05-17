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

    // 대중교통 길찾기 - 0(지하철+버스), 1(지하철), 2(버스)
    @GetMapping("/paths")
    public List<Map<String, Object>> getPaths(@RequestParam double sx,
                                              @RequestParam double sy,
                                              @RequestParam double ex,
                                              @RequestParam double ey,
                                              @RequestParam int searchPathType) throws JsonProcessingException {
        return odsayService.transPaths(sx, sy, ex, ey, searchPathType);
    }
}
