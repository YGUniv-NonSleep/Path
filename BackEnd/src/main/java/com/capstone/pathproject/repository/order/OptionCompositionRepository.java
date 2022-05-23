package com.capstone.pathproject.repository.order;

import com.capstone.pathproject.domain.order.OptionComposition;
import com.capstone.pathproject.domain.order.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionCompositionRepository extends JpaRepository<OptionComposition, Long> {
    
}
