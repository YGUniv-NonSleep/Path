package com.capstone.pathproject.repository.carpool;

import com.capstone.pathproject.domain.carpool.CarPostRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CarPostRequestRepository extends JpaRepository<CarPostRequest,Long> {
    Optional<CarPostRequest> findByCarPostId(Long Id);
    List<CarPostRequest> findByCarPostMemberId(Long memberId);
    List<CarPostRequest> findByMemberId(Long memberId);

}
