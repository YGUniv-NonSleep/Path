package com.capstone.pathproject.dto.mobility;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class MobilReserveRequest {
    private Long memberId;
    private Long mobilId;

    public MobilReserveRequest(Long memberId, Long mobilId) {
        this.memberId = memberId;
        this.mobilId = mobilId;
    }
}
