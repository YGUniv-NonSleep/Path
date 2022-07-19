package com.capstone.pathproject.repository.carpool;

import com.capstone.pathproject.domain.carpool.OperationDetail;
import com.capstone.pathproject.dto.carpool.OperationDetailDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OperationRepository extends JpaRepository<OperationDetail, Long> {
    Optional<OperationDetail> findByCarPostId(Long carPostId);
    List<OperationDetail> findByMemberId(Long memberId);
}
