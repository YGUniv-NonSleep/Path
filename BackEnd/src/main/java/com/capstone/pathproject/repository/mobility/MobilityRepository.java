package com.capstone.pathproject.repository.mobility;

import com.capstone.pathproject.domain.mobility.Mobility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MobilityRepository extends JpaRepository<Mobility, Long> {

    // 500m 범위 x경도(Long) 0.0055, y위도(Lat) 0.00475,
    @Query("select m from Mobility m where (m.longitude between :x - 0.0055 and :x + 0.0055) and (m.latitude between :y - 0.00475 and :y + 0.00475)")
    List<Mobility> getLocationMobility(@Param("x") double x, @Param("y") double y);
}
