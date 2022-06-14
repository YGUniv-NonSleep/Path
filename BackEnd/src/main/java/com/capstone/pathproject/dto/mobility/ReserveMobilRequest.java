package com.capstone.pathproject.dto.mobility;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class ReserveMobilRequest {
    private Long memberId;
    private Long mobilId;

    public ReserveMobilRequest(Long memberId, Long mobilId) {
        this.memberId = memberId;
        this.mobilId = mobilId;
    }
}
