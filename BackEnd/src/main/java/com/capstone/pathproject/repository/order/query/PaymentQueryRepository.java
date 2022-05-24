package com.capstone.pathproject.repository.order.query;

import com.capstone.pathproject.domain.order.Payment;
import com.capstone.pathproject.dto.member.MemberPaymentDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentQueryRepository extends JpaRepository<Payment, Long> {

    @Query("select new com.capstone.pathproject.dto.member.MemberPaymentDto(p.id, o.id, p.price, p.createdDateTime, p.state, p.method) " +
            "from Payment p " +
            "join p.order o " +
            "join o.member m " +
            "where p.order.member.id = :memberId " +
            "order by p.createdDateTime desc")
    Page<MemberPaymentDto> findMemberPayments(@Param("memberId") Long memberId, Pageable pageable);
}
