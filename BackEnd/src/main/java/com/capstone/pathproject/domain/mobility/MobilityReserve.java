package com.capstone.pathproject.domain.mobility;

import com.capstone.pathproject.domain.BaseTimeEntity;
import com.capstone.pathproject.domain.member.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@SequenceGenerator(
        name = "MOBILITY_RESERVE_SEQ_GENERATOR",
        sequenceName = "MOBILITY_RESERVE_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverrides({
        @AttributeOverride(name = "createdDateTime", column = @Column(name = "MOBIL_RESER_CREATED_DATETIME")),
        @AttributeOverride(name = "updatedDateTime", column = @Column(name = "MOBIL_RESER_UPDATED_DATETIME"))
})
public class MobilityReserve extends BaseTimeEntity {

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

    @Enumerated(EnumType.STRING)
    @Column(name = "MOBIL_RESER_RESULT")
    private MobilityReserveResult result;

    @Builder
    public MobilityReserve(Long id, Member member, Mobility mobility, MobilityReserveResult result) {
        this.id = id;
        this.member = member;
        this.mobility = mobility;
        this.result = result;
    }

    // 예약 생성
    public static MobilityReserve reserveMobility(Mobility mobility, Member member) {
        return MobilityReserve.builder()
                .mobility(mobility)
                .member(member)
                .result(MobilityReserveResult.READY)
                .build();
    }

    public void useMobility() {
        this.result = MobilityReserveResult.USE;
    }

    public void disUseMobility() {
        this.result = MobilityReserveResult.DISUSE;
    }
}
