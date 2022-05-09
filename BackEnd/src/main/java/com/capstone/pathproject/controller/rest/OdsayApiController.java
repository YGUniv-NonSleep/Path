package com.capstone.pathproject.controller.rest;

import com.capstone.pathproject.service.rest.OdsayService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/odsay")
public class OdsayApiController {

    private final OdsayService odsayService;

    // 대중교통 길찾기
    @GetMapping("/path")
    public List<JsonNode> path(@RequestParam String sx,
                               @RequestParam String sy,
                               @RequestParam String ex,
                               @RequestParam String ey) {
        return odsayService.TransPath(sx, sy, ex, ey);
    }
}
