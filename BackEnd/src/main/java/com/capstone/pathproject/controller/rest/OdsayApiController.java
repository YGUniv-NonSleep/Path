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

    // 통합 길찾기 - 퍼스널 모빌리티 선택 안함
    @GetMapping("/path")
    public List<Map<String, Object>> path(@RequestParam String sx,
                                          @RequestParam String sy,
                                          @RequestParam String ex,
                                          @RequestParam String ey) throws JsonProcessingException {
        return odsayService.TransPath(sx, sy, ex, ey);
    }
}
