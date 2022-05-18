package com.capstone.pathproject.repository.order;

import com.capstone.pathproject.domain.order.Composition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompositionRepository extends JpaRepository<Composition, Long> {
    
}
