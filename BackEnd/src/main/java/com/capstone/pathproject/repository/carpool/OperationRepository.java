package com.capstone.pathproject.repository.carpool;

import com.capstone.pathproject.domain.carpool.OperationDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OperationRepository extends JpaRepository<OperationDetail, Long> {
    List<OperationDetail> findByCarPostId(Long postId);
}
