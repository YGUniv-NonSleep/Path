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
        name = "MOBILITY_RESERVATION_SEQ_GENERATOR",
        sequenceName = "MOBILITY_RESERVATION_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MobilityReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MOBILITY_RESERVATION_SEQ_GENERATOR")
    @Column(name = "MOBIL_RESER_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEM_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MOBIL_ID")
    private Mobility mobility;

    @Column(name = "MOBIL_RESER_DATE")
    private LocalDateTime reserveDateAndTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "MOBIL_RESER_RESULT")
    private MobilityReservationResult result;
}
