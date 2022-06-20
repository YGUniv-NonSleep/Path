package com.capstone.pathproject.controller.mobility;

import com.capstone.pathproject.domain.mobility.MobilityType;
import com.capstone.pathproject.dto.mobility.LocationMobilityDto;
import com.capstone.pathproject.dto.mobility.ReserveMobilRequest;
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

    // 퍼스널 모빌리티 예약
    @PostMapping("/mobilities/reserve")
    public ResponseEntity<Message<?>> reserveMobility(@RequestBody ReserveMobilRequest reserveRequest) {
        Message<String> message = mobilityService.reserveMobility(reserveRequest);
        return responseUtil.createResponseEntity(message);
    }

    // 예약한 퍼스널 모빌리티 사용
    @PatchMapping("/mobilities/reserve")
    public ResponseEntity<Message<?>> useReserveMobility(@RequestBody ReserveMobilRequest reserveRequest) {
        Message<String> message = mobilityService.useReserveMobility(reserveRequest);
        return responseUtil.createResponseEntity(message);
    }

    // 예약중인 퍼스널 모빌리티 조회
    @GetMapping("/mobilities/reserve")
    public ResponseEntity<Message<?>> getReserveMobility(@RequestParam("memberId") Long memberId) {
        Message<Object> message = mobilityService.getReserveMobility(memberId);
        return responseUtil.createResponseEntity(message);
    }
}
