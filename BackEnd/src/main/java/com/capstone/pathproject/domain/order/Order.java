package com.capstone.pathproject.domain.order;


import com.capstone.pathproject.domain.BaseTimeEntity;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.member.MemberDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@SequenceGenerator(
        name = "ORDER_SEQ_GENERATOR",
        sequenceName = "ORDER_SEQ",
        initialValue = 1,
        allocationSize = 1
)
@AttributeOverrides({
        @AttributeOverride(name = "createdDateTime", column = @Column(name = "ORDER_CREATED_DATETIME")),
})
public class Order extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "ORDER_SEQ_GENERATOR")
    @Column(name = "ORDER_ID")
    private Long id;

    @Column(name = "ORDER_PRICE")
    private int price;

    @Column(name = "ORDER_STATE")
    private OrderState state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEM_ID")
    private Member member;


    @Builder(builderMethodName = "createOrder")
    public Order(Long id, int price, OrderState state, MemberDto member){
        this.id = id;
        this.member = member.toEntity();
        this.price = price;
        this.state = state;
    }

}
