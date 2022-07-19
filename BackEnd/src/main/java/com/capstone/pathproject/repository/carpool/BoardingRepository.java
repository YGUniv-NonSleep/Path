package com.capstone.pathproject.repository.carpool;

import com.capstone.pathproject.domain.carpool.BoardingDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardingRepository extends JpaRepository<BoardingDetail, Long> {
    List<BoardingDetail> findByMemberId(Long memberId);
}
