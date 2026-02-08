package com.fit.backend.service;

import com.fit.backend.auth.entity.User;
import com.fit.backend.dto.OrderRequest;
import com.fit.backend.dto.OrderResponse;
import com.fit.backend.entity.*;
import com.fit.backend.repository.OrderRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class OrderService {
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;

//    @Autowired
//    private PaymentIntentService paymentIntentService;

    @Transactional
    public Order createOrder(OrderRequest orderRequest, Principal principal) throws Exception {
        User user = (User) userDetailsService.loadUserByUsername(principal.getName());

        Address address = user.getAddressList().stream().filter(
                address1 -> orderRequest
                        .getAddressId()
                        .equals(address1.getId())
                )
                .findFirst().orElseThrow(BadRequestException::new);

        Order order = Order.builder()
                .user(user)
                .address(address)
                .totalAmount(orderRequest.getTotalAmount())
                .orderDate(orderRequest.getOrderDate())
                .discount(orderRequest.getDiscount())
                .expectedDeliveryDate(orderRequest.getExpectedDeliveryDate())
                .paymentMethod(orderRequest.getPaymentMethod())
                .orderStatus(OrderStatus.PENDING)
                .build();

        List<OrderItem> orderItems = orderRequest
                .getOrderItemRequests()
                .stream()
                .map(orderItemRequest -> {
            try {
                Product product = productService.fetchProductById(orderItemRequest.getProductId());

                OrderItem orderItem = OrderItem.builder()
                        .product(product)
                        .productVariantId(orderItemRequest
                                .getProductVariantId())
                        .quantity(orderItemRequest
                                .getQuantity())
                        .order(order)
                        .build();

                return orderItem;
            } catch(Exception e) {
                throw new RuntimeException(e);
            }
        }).toList();

        order.setOrderItemList(orderItems);
        Payment payment = new Payment();
        payment.setPaymentStatus(PaymentStatus.PENDING);
        payment.setPaymentDate(new Date());
        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentMethod(order.getPaymentMethod());
        order.setPayment(payment);
        Order savedOrder = orderRepository.save(order);

        OrderResponse orderResponse = OrderResponse.builder()
                .paymentMethod(orderRequest.getPaymentMethod())
                .orderId(savedOrder.getId())
                .build();
//        if(Objects.equals(orderRequest.getPaymentMethod(), "CARD")){
//            orderResponse.setCredentials(paymentIntentService.createPaymentIntent(order));
//        }

        return orderResponse;

    }
}
