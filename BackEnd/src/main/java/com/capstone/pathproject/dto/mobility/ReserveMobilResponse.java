package com.capstone.pathproject.dto.mobility;

import com.capstone.pathproject.domain.mobility.Mobility;
import com.capstone.pathproject.domain.mobility.MobilityReserveResult;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@NoArgsConstructor
public class ReserveMobilResponse {

    private Long reserveId;
    private LocationMobilityDto mobilityDto;
    private MobilityReserveResult result;
    private String reserveDateTime;

    public ReserveMobilResponse(Long reserveId, Mobility mobility, MobilityReserveResult result, LocalDateTime reserveLocalDateTime) {
        this.reserveId = reserveId;
        this.mobilityDto = new LocationMobilityDto(mobility);
        this.result = result;
        this.reserveDateTime = reserveLocalDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
