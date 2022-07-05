package com.capstone.pathproject.repository.order;

import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.domain.order.Order;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

List<Order> findByCompany(Company company);

}
