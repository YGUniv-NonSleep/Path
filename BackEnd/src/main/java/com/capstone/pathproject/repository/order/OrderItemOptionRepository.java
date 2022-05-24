package com.capstone.pathproject.repository.order;

import com.capstone.pathproject.domain.order.OrderItemOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemOptionRepository extends JpaRepository<OrderItemOption, Long> {
    
}
