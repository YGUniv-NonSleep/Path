package com.capstone.pathproject.repository.order;

import com.capstone.pathproject.domain.order.Order;
import com.capstone.pathproject.domain.order.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    Optional<OrderItem> findByOrder(Order order);
    
}
