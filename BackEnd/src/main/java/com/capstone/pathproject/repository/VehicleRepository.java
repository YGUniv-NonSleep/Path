package com.capstone.pathproject.repository;

import com.capstone.pathproject.domain.carpool.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle,Long> {
}
