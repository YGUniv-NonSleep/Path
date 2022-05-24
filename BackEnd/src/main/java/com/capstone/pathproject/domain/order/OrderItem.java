package com.capstone.pathproject.domain.order;


import com.capstone.pathproject.domain.company.Product;
import lombok.*;

import javax.persistence.*;

@ToString
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SequenceGenerator(
        name = "ORDER_ITEM_SEQ_GENERATOR",
        sequenceName = "ORDER_ITEM_SEQ",
        initialValue = 1, allocationSize = 1
)
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator ="ORDER_ITEM_SEQ_GENERATOR")
    @Column(name = "ORDER_ITEM_ID")
    private Long id;

    @Column(name = "ORDER_ITEM_QUANTITY")
    private int quantity;

    @Column(name = "ORDER_ITEM_PRICE")
    private int price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROD_ID")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ORDER_ID")
    private Order order;


    @Builder(builderMethodName = "createComposition")
    public OrderItem(Long id, int price, int quantity, Product product, Order order){
        this.id = id;
        this.order = order;
        this.price = price;
        this.product = product;
        this.quantity = quantity;
    }

}
