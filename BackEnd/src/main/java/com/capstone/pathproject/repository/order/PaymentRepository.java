package com.capstone.pathproject.repository.order;

import com.capstone.pathproject.domain.order.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
}
