package com.capstone.pathproject.domain.mobility;

import com.capstone.pathproject.domain.member.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

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
    @Column(name = "MOBILITY_RESERVATION_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "MOBILITY_ID")
    private Mobility mobility;

    @Column(name = "MOBILITY_RESERVATION_DATE")
    private LocalDateTime reserveDateAndTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "MOBILITY_RESERVATION_RESULT")
    private MobilityReservationResult result;
}
