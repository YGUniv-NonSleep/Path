package com.capstone.pathproject.controller.repository;

import com.capstone.pathproject.domain.carpool.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle,Long> {
}
