package com.capstone.pathproject.domain.order;


import com.capstone.pathproject.domain.company.DetailOption;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@SequenceGenerator(
        name = "ORDER_ITEM_OPTION_SEQ_GENERATOR",
        sequenceName = "ORDER_ITEM_OPTION_SEQ",
        initialValue = 1,
        allocationSize = 1
)
public class OrderItemOption {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "ORDER_ITEM_OPTION_SEQ_GENERATOR")
    @Column(name = "ORDER_ITEM_OPT_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ORDER_ITEM_ID")
    private OrderItem orderItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DETAIL_OPTION_ID")
    private DetailOption detailOption;

    @Builder(builderMethodName = "createOptionComposition")
    public OrderItemOption(Long id, OrderItem orderItem, DetailOption detailOption){
        this.orderItem = orderItem;
        this.id = id;
        this.detailOption = detailOption;

    }



}
