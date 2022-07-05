package com.capstone.pathproject.domain.order;


import com.capstone.pathproject.domain.BaseTimeEntity;
import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.domain.member.Member;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "ORDERS")
@SequenceGenerator(
        name = "ORDER_SEQ_GENERATOR",
        sequenceName = "ORDER_SEQ",
        initialValue = 1, allocationSize = 1
)
@AttributeOverrides({
        @AttributeOverride(name = "createdDateTime", column = @Column(name = "ORDER_CREATED_DATETIME")),
        @AttributeOverride(name = "updatedDateTime", column = @Column(name = "ORDER_UPDATED_DATETIME"))
})
public class Order extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "ORDER_SEQ_GENERATOR")
    @Column(name = "ORDER_ID")
    private Long id;

    @Column(name = "ORDER_PRICE")
    private int price;

    @Column(name = "ORDER_REQUEST")
    private String request;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "ORDER_STATE")
    private OrderState state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEM_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COM_ID")
    private Company company;

    @Builder(builderMethodName = "createOrder")
    public Order(Long id, int price, OrderState state, Member member, String request, Company company){
        this.id = id;
        this.member = member;
        this.price = price;
        this.state = state;
        this.request = request;
        this.company = company;
    }

    public void updateState(String state){
        this.state = OrderState.valueOf(state);
    }

}
