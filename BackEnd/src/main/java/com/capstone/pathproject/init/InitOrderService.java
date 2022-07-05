package com.capstone.pathproject.init;

import com.capstone.pathproject.domain.company.DetailOption;
import com.capstone.pathproject.domain.company.Product;
import com.capstone.pathproject.domain.order.*;
import com.capstone.pathproject.dto.order.SaveOrderCompositionDto;
import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.repository.order.OrderItemOptionRepository;
import com.capstone.pathproject.repository.order.OrderItemRepository;
import com.capstone.pathproject.repository.order.OrderRepository;
import com.capstone.pathproject.repository.order.PaymentRepository;
import com.capstone.pathproject.repository.product.DetailOptionRepository;
import com.capstone.pathproject.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Optional;

@Component
@Transactional
@RequiredArgsConstructor
public class InitOrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderItemOptionRepository orderItemOptionRepository;
    private final PaymentRepository paymentRepository;
    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;
    private final DetailOptionRepository detailOptionRepository;

    public void dbInitOrder(){

        for (int k = 1; k<= 5 ; k++)
        for (int i = 1; i <=5 ; i++){
            Order order = createOrder(k, i);
            orderRepository.save(order);
            for (int j = 1; j <=5 ; j++){
                OrderItem orderItem = createOrderItem(order.getId(), (long) j);
                orderItemRepository.save(orderItem);
                for (int h=1; h<=5 ; h++){
                    OrderItemOption orderItemOption = createOrderItemOption((long) h, orderItem.getId());
                    orderItemOptionRepository.save(orderItemOption);
                }
            }
            Payment payment = createPayment(order.getId());
            paymentRepository.save(payment);
        }
    }


    public Payment createPayment(Long orderId){
        return Payment.builder()
                .order(orderRepository.findById(orderId).get())
                .paymentKey("paymentKey")
                .method("카드")
                .price(3000)
                .state(OrderState.COMPLETED)
                .build();
    }

    public OrderItemOption createOrderItemOption(Long DetailOptId, Long orderItemId){
        return OrderItemOption.createOptionComposition()
                .detailOption(detailOptionRepository.findById(DetailOptId).get())
                .orderItem(orderItemRepository.findById(orderItemId).get())
                .build();
    }

    public OrderItem createOrderItem(Long orderId, Long productId){
        return OrderItem.createComposition()
                .order(orderRepository.findById(orderId).get())
                .product(productRepository.findById(productId).get())
                .quantity(30)
                .price((int) (3000*productId))
                .build();
    }


    public Order createOrder(long memberId, int a){
        return Order.createOrder()
                .state(OrderState.CHECKING)
                .price((int) (3000 * a))
                .member(memberRepository.findById(memberId).get())
                .request("1회용 수저가 "+ a +"개 필요해요!")
                .build();

    }





}
