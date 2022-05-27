package com.capstone.pathproject.dto.order;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AmountByDayDto {
    private Long paymentId;
    private LocalDateTime payDate;
    private int payPrice;

    public AmountByDayDto(Long paymentId, LocalDateTime payDate, int payPrice) {
        this.paymentId = paymentId;
        this.payDate = payDate;
        this.payPrice = payPrice;
    }
}
