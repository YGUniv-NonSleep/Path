package com.capstone.pathproject.domain.order;


import com.capstone.pathproject.domain.company.Product;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SequenceGenerator(
        name = "COMPOSITION_SEQ_GENERATOR",
        sequenceName = "COMPOSITION_SEQ",
        initialValue = 1,
        allocationSize = 1
)
public class Composition {

    @Id
    @SequenceGenerator(name = "COMPOSITION_SEQ_GENERATOR")
    @Column(name = "COMPOSITION_ID")
    private Long id;

    @Column(name = "COMPOSITION_QUANTITY")
    private int quantity;

    @Column(name = "COMPOSITION_PRICE")
    private int price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROD_ID")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ORDER_ID")
    private Order order;


//    @Builder(builderMethodName = "createComposition")
//    public Composition(Long id, int price, int quantity, Product product, Order order){
//        this.id = id;
//        this.order = order;
//        this.price = price;
//        this.product = product;
//        this.quantity = quantity;
//    }

}
