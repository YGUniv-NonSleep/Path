package com.capstone.pathproject.repository.mobility;

import com.capstone.pathproject.domain.mobility.Mobility;
import com.capstone.pathproject.domain.mobility.MobilityType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MobilityRepository extends JpaRepository<Mobility, Long> {

    // 500m 범위 x경도(Long) 0.0055, y위도(Lat) 0.00475,
    @EntityGraph(attributePaths = {"mobilityCompany"})
    @Query("select m from Mobility m " +
            "where (m.longitude between :x - 0.0055 and :x + 0.0055) " +
            "and (m.latitude between :y - 0.00475 and :y + 0.00475) " +
            "and (m.state = 'READY') " +
            "and (m.type = :type)")
    List<Mobility> findLocationMobilities(@Param("type") MobilityType type, @Param("x") double x, @Param("y") double y);

    @Query("select m from Mobility m left join fetch m.mobilityCompany where m.id = :id")
    Optional<Mobility> findMobility(@Param("id") Long id);
}
