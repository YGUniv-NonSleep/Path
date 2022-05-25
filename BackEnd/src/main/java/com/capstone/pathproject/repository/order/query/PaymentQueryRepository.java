package com.capstone.pathproject.repository.order.query;

import com.capstone.pathproject.domain.order.Payment;
import com.capstone.pathproject.dto.member.MemberPaymentDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;


public interface PaymentQueryRepository extends JpaRepository<Payment, Long> {

    @Query("select new com.capstone.pathproject.dto.member.MemberPaymentDto(p.id, o.id, p.price, p.createdDateTime, p.state, p.method) " +
            "from Payment p " +
            "join p.order o " +
            "join o.member m " +
            "where p.order.member.id = :memberId " +
            "order by p.createdDateTime desc")
    Slice<MemberPaymentDto> findMemberPayments(@Param("memberId") Long memberId, Pageable pageable);

    @Query("select new com.capstone.pathproject.dto.member.MemberPaymentDto(p.id, o.id, p.price, p.createdDateTime, p.state, p.method) " +
            "from Payment p " +
            "join p.order o " +
            "join o.member m " +
            "where p.order.member.id = :memberId " +
            "and p.createdDateTime between :startDate and :endDate " +
            "order by p.createdDateTime desc")
    Slice<MemberPaymentDto> findMemberPaymentsBetweenDate(@Param("memberId") Long memberId,
                                                          @Param("startDate") LocalDateTime startDate,
                                                          @Param("endDate") LocalDateTime endDate,
                                                          Pageable pageable);
}
