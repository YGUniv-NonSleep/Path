package com.capstone.pathproject.service.order;

import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.domain.company.DetailOption;
import com.capstone.pathproject.domain.company.Product;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.order.*;
import com.capstone.pathproject.dto.order.OrderByCompanyDto;
import com.capstone.pathproject.dto.order.SaveOrderCompositionDto;
import com.capstone.pathproject.dto.order.SaveOrderDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.company.CompanyRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.repository.order.OrderItemRepository;
import com.capstone.pathproject.repository.order.OrderItemOptionRepository;
import com.capstone.pathproject.repository.order.OrderRepository;
import com.capstone.pathproject.repository.order.PaymentRepository;
import com.capstone.pathproject.repository.product.DetailOptionRepository;
import com.capstone.pathproject.repository.product.ProductRepository;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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
    private final PaymentRepository paymentRepository;
    private final CompanyRepository companyRepository;


    public Message<SaveOrderDto> orderProduct(SaveOrderDto saveOrderDto) {

        System.out.println(saveOrderDto.getMemberId());
        System.out.println(saveOrderDto.getMemberId().getClass());

        Optional<Member> member = memberRepository.findById(saveOrderDto.getMemberId());
        Company company = companyRepository.findById(saveOrderDto.getCompanyId()).get();

        if (member.isPresent()){
            Order order = Order.createOrder()
                    .state(OrderState.CHECKING)
                    .member(member.get())
                    .price(saveOrderDto.getTotalAmount())
                    .request(saveOrderDto.getRequest())
                    .company(company)
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

                Payment payment = Payment.builder()
                        .order(order)
                        .paymentKey(saveOrderDto.getPaymentKey())
                        .state(OrderState.valueOf("COMPLETED"))
                        .method(saveOrderDto.getMethod())
                        .price(saveOrderDto.getSuppliedAmount())
                        .build();
                paymentRepository.save(payment);
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

    public Message<?> updateState(Long orderId, String state) {
        Optional<Order> order = orderRepository.findById(orderId);
        if(order.isPresent()){
            order.get().updateState(state);
            orderRepository.save(order.get());
            return Message.<String>builder()
                    .message("update State Success")
                    .header(StatusEnum.OK)
                    .body("update State Success")
                    .build();
        }else{
            return Message.<String>builder()
                    .message("update State fail")
                    .header(StatusEnum.OK)
                    .body("잘못된 주문 아이디")
                    .build();
        }
    }

    public Message<?> getOrderList(Long companyId){
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        Company company = companyRepository.findById(companyId).get();

        System.out.println("memid = " + member.getId());
        System.out.println("companyId = " + companyId);

        List<Order> orderList = orderRepository.findByCompany(company);

        ArrayList<OrderByCompanyDto> orders = new ArrayList<>();

        orderList.stream().map( order -> new OrderByCompanyDto(
                order.getId(),
                order.getCompany().getId(),
                order.getMember().getId(),
                order.getCompany().getName(),
                order.getRequest(),
                order.getState(),
                order.getPrice()
        ) ).forEach(orderByCompanyDto -> orders.add(orderByCompanyDto));

//        for (OrderByCompanyDto order:orders) {
//            System.out.println( "orderString="+order.toString()  );
//        }

        return Message.<  List<OrderByCompanyDto>>builder()
                .message("OrderSuccess")
                .header(StatusEnum.OK)
                .body(orders)
                .build();

    }

    public Message<?> getOrderDetail(Long orderId) {

        Order order = orderRepository.findById(orderId).get();
        OrderItem orderItem = orderItemRepository.findByOrder(order).get();


        System.out.println("orderItem.toString() = " + orderItem.toString());


        return null;
    }
}
