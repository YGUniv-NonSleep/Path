package com.capstone.pathproject.repository.carpool;

import com.capstone.pathproject.domain.carpool.CarPost;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarPostRepository extends JpaRepository<CarPost,Long> {
    //List<CarPost> findByTitleContaining(String keyword, Pageable pageable);
    List<CarPost> findByStartLocal1Containing(String keyword,Pageable pageable);
    List<CarPost> findByStartLocal2Containing(String keyword,Pageable pageable);
}
