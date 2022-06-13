package com.capstone.pathproject.controller.mobility;

import com.capstone.pathproject.domain.mobility.MobilityType;
import com.capstone.pathproject.dto.mobility.LocationMobilityDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.mobility.MobilityService;
import com.capstone.pathproject.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MobilityApiController {

    private final MobilityService mobilityService;
    private final ResponseUtil responseUtil;

    @GetMapping("/mobilities")
    public ResponseEntity<Message<?>> getLocationMobility(@RequestParam double x,
                                                          @RequestParam double y,
                                                          @RequestParam("type") MobilityType type) {
        Message<List<LocationMobilityDto>> mobilityDTOs = mobilityService.getLocationMobility(type, x, y);
        return responseUtil.createResponseEntity(mobilityDTOs);
    }
}
