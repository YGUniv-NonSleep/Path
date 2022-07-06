package com.capstone.pathproject.repository.carpool;

import com.capstone.pathproject.domain.carpool.BoardingDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardingRepository extends JpaRepository<BoardingDetail, Long> {
}
