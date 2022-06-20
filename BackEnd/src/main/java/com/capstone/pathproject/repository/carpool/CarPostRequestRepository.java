package com.capstone.pathproject.repository.carpool;

import com.capstone.pathproject.domain.carpool.CarPostRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarPostRequestRepository extends JpaRepository<CarPostRequest,Long> {
    List<CarPostRequest> findByCarPostId(Long Id);
    List<CarPostRequest> findByCarPostMemberId(Long memberId);
}
