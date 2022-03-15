package com.capstone.pathproject.domain.mobility;

import com.capstone.pathproject.domain.member.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@SequenceGenerator(
        name = "MOBILITY_PAYMENT_SEQ_GENERATOR",
        sequenceName = "MOBILITY_PAYMENT_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MobilityPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MOBILITY_PAYMENT_SEQ_GENERATOR")
    @Column(name = "MOBIL_PAY_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MOBIL_ID")
    private Mobility mobility;

    @ManyToOne
    @JoinColumn(name = "MEM_ID")
    private Member member;

    @Column(name = "MOBIL_PAY_PRICE")
    private int price;

    @Column(name = "MOBIL_PAY_USING_TIME")
    private LocalDateTime usingTime;

    @Column(name = "MOBIL_PAY_START_TIME")
    private LocalDateTime startTime;

    @Column(name = "MOBIL_PAY_END_TIME")
    private LocalDateTime endTime;

    @Column(name = "MOBIL_PAY_TOSS_KEY")
    private String paymentKey;
}
