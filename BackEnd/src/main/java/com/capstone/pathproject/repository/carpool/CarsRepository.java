package com.capstone.pathproject.repository.carpool;

import com.capstone.pathproject.domain.carpool.Cars;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.member.MemberDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarsRepository extends JpaRepository<Cars,Long> {
    List<Cars> findByMember_Id(Long memberId);
    List<Cars> findByCarKindContaining(String keyword, Pageable pageable);
}
