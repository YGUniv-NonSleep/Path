package com.capstone.pathproject.repository;

import com.capstone.pathproject.domain.carpool.CarPoolPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarPoolPostRepository extends JpaRepository<CarPoolPost,Long> {
}
