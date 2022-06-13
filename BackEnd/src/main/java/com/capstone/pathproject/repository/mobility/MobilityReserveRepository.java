package com.capstone.pathproject.repository.mobility;

import com.capstone.pathproject.domain.mobility.MobilityReserve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MobilityReserveRepository extends JpaRepository<MobilityReserve, Long> {


    @Query("select mr " +
            "from MobilityReserve mr " +
            "join mr.member m " +
            "join mr.mobility mo " +
            "where mo.id = :mobilId " +
            "and m.id = :memberId " +
            "and mr.createdDateTime >= :time " +
            "and mr.result = 'READY'")
    Optional<MobilityReserve> findReadyMobil(@Param("mobilId") Long mobilId,
                                             @Param("memberId") Long memberId,
                                             @Param("time") LocalDateTime time);

    @Query("select mr from MobilityReserve mr where mr.result = 'READY' and mr.createdDateTime < :time")
    List<MobilityReserve> findReadyMobilities(@Param("time") LocalDateTime time);

    @Modifying(clearAutomatically = true)
    @Query("update MobilityReserve mr set mr.result = 'DISUSE' where mr.id in :reserveMobilId")
    void updateToDisuseMobilities(@Param("reserveMobilId") List<Long> reserveMobilId);
}
