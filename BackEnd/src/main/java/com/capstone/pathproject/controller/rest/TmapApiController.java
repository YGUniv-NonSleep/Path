package com.capstone.pathproject.controller.rest;

import com.capstone.pathproject.service.rest.TmapService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/tmap")
public class TmapApiController {

    private final TmapService tmapService;

    @PostMapping("/walkpath")
    public String walkPath(@RequestParam String sx,
                           @RequestParam String sy,
                           @RequestParam String ex,
                           @RequestParam String ey) {
        return tmapService.walkPath(sx, sy, ex, ey);
    }
}
