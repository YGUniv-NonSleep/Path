package com.capstone.pathproject.controller.repository;

import com.capstone.pathproject.domain.carpool.CarPoolPost;
import com.capstone.pathproject.dto.CarPoolPostDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarPoolPostRepository extends JpaRepository<CarPoolPost,Long> {
}
