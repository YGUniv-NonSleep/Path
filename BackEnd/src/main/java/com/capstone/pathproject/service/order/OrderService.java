package com.capstone.pathproject.service.order;

import com.capstone.pathproject.domain.company.DetailOption;
import com.capstone.pathproject.domain.company.Product;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.order.OrderItem;
import com.capstone.pathproject.domain.order.OrderItemOption;
import com.capstone.pathproject.domain.order.Order;
import com.capstone.pathproject.domain.order.OrderState;
import com.capstone.pathproject.dto.order.SaveOrderCompositionDto;
import com.capstone.pathproject.dto.order.SaveOrderDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.repository.order.OrderItemRepository;
import com.capstone.pathproject.repository.order.OrderItemOptionRepository;
import com.capstone.pathproject.repository.order.OrderRepository;
import com.capstone.pathproject.repository.product.DetailOptionRepository;
import com.capstone.pathproject.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final DetailOptionRepository detailOptionRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderItemOptionRepository orderItemOptionRepository;

    public Message<SaveOrderDto> orderProduct(SaveOrderDto saveOrderDto) {

        System.out.println(saveOrderDto.getMemberId());
        System.out.println(saveOrderDto.getMemberId().getClass());

        Optional<Member> member = memberRepository.findById(saveOrderDto.getMemberId());

        if (member.isPresent()){
            Order order = Order.createOrder()
                    .state(OrderState.CHECKING)
                    .member(member.get())
                    .price(saveOrderDto.getTotalAmount())
                    .build();
            orderRepository.save(order);

            for (SaveOrderCompositionDto saveOrderCompositionDto :saveOrderDto.getOrderCompositionList()) {
                Optional<Product> product =  productRepository.findById(saveOrderCompositionDto.getProductId());
                OrderItem orderItem = OrderItem.createComposition()
                        .product(product.get())
                        .order(order)
                        .price(saveOrderCompositionDto.getPrice())
                        .quantity(saveOrderCompositionDto.getQuantity())
                        .build();
                orderItemRepository.save(orderItem);

                for (Long DetailOptionId:saveOrderCompositionDto.getDetailOptionList()) {
                    Optional<DetailOption> detailOption = detailOptionRepository.findById(DetailOptionId);
                    OrderItemOption orderItemOption = OrderItemOption.createOptionComposition()
                            .detailOption(detailOption.get())
                            .orderItem(orderItem)
                            .build();
                    orderItemOptionRepository.save(orderItemOption);
                }
            }


            Optional<Order> finalOrder = orderRepository.findById(order.getId());

            System.out.println(finalOrder.toString());
        }


        return Message.<SaveOrderDto>builder()
                .message("OrderSuccess")
                .header(StatusEnum.OK)
                .body(saveOrderDto)
                .build();
    }
}
