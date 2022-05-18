package com.capstone.pathproject.domain.order;


import com.capstone.pathproject.domain.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SequenceGenerator(
        name = "PAYMENT_SEQ_GENERATOR",
        sequenceName = "PAYMENT_SEQ",
        initialValue = 1,
        allocationSize = 1
)
@AttributeOverrides({
        @AttributeOverride(name = "createdDateTime", column = @Column(name = "ORDER_CREATED_DATETIME"))
})
public class Payment extends BaseTimeEntity {
    @Id
    @Column(name = "PAYMENT_ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "PAYMENT_SEQ_GENERATOR")
    private Long id;

    @Column(name = "PAYMENT_KEY")
    private String paymentKey;

    @Column(name = "PAY_PRICE")
    private String price;

    @Column(name = "PAY_METHOD")
    private String method;

    @Enumerated(EnumType.STRING)
    @Column(name = "PAY_STATE")
    private OrderState state;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ORDER_ID")
    private Order order;


}
