package com.capstone.pathproject.controller.mobility;

import com.capstone.pathproject.dto.mobility.LocationMobilityDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.mobility.MobilityService;
import com.capstone.pathproject.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MobilityApiController {

    private final MobilityService mobilityService;
    private final ResponseUtil responseUtil;

    @GetMapping("/mobil")
    public ResponseEntity<Message<?>> getLocationMobility(@RequestParam double x,
                                                          @RequestParam double y) {
        Message<List<LocationMobilityDto>> mobilityDTOs = mobilityService.getLocationMobility(x, y);
        return responseUtil.createResponseEntity(mobilityDTOs);
    }
}
