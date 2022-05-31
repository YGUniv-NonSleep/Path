package com.capstone.pathproject.repository.order.query;

import com.capstone.pathproject.domain.order.OrderItem;
import com.capstone.pathproject.dto.order.OrderItemQueryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemQueryRepository extends JpaRepository<OrderItem, Long> {

    @Query("select new com.capstone.pathproject.dto.order.OrderItemQueryDto(oi.id, oi.order.id, c.name, pb.name, p.price, p.discount, oi.quantity) " +
            "from OrderItem  oi " +
            "join oi.product p " +
            "join p.prodBasic pb " +
            "join p.company c " +
            "where oi.order.id in :orderIds")
    List<OrderItemQueryDto> findOrderItems(@Param("orderIds") List<Long> orderIds);
}
