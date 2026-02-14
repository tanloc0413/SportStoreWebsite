package com.fit.backend.service;

import com.fit.backend.auth.entity.User;
import com.fit.backend.dto.OrderDetails;
import com.fit.backend.dto.OrderItemDetail;
import com.fit.backend.dto.OrderRequest;
import com.fit.backend.dto.OrderResponse;
import com.fit.backend.entity.*;
import com.fit.backend.repository.OrderRepository;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.*;

@Service
public class OrderService {
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private VNPayService vnPayService;

    @Transactional
    public OrderResponse createOrder(
            OrderRequest orderRequest,
            Principal principal,
            HttpServletRequest request)
            throws Exception {
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

        // nếu là COD
        OrderResponse orderResponse = OrderResponse.builder()
                .orderId(savedOrder.getId())
                .paymentMethod(savedOrder.getPaymentMethod())
                .build();

        if ("VNPay".equals(orderRequest.getPaymentMethod())) {
            // Gọi Service VNPay đã viết ở bước trước để tạo link
            String paymentUrl = vnPayService.createPaymentUrl(savedOrder, request);

            // Đảm bảo gán vào Map đúng key mà Frontend đang chờ (paymentUrl)
            Map<String, String> credentials = new HashMap<>();
            credentials.put("paymentUrl", paymentUrl);
            orderResponse.setCredentials(credentials);
        }

        return orderResponse;

    }

    // Thêm method lấy Order theo ID
    public Order getOrderById(Integer id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // Thêm method cập nhật trạng thái thanh toán
    public void updatePaymentStatus(Integer orderId, String status) {
        Order order = getOrderById(orderId);
        Payment payment = order.getPayment();

        if ("COMPLETED".equals(status)) {
            payment.setPaymentStatus(PaymentStatus.COMPLETED);
            order.setOrderStatus(OrderStatus.IN_PROGRESS); // Hoặc trạng thái PAID
        } else {
            payment.setPaymentStatus(PaymentStatus.FAILED);
            order.setOrderStatus(OrderStatus.CANCELLED); // Hoặc giữ PENDING tùy logic
        }

        payment.setPaymentDate(new Date());
        orderRepository.save(order);
    }

    // [LOGIC MỚI] Xử lý kết quả trả về từ Frontend gọi xuống
    public Map<String, Object> processPaymentReturn(HttpServletRequest request) {
        int paymentStatus = vnPayService.orderReturn(request);
        String orderInfo = request.getParameter("vnp_TxnRef");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");

        Map<String, Object> result = new HashMap<>();

        if (orderInfo != null) {
            Integer orderId = Integer.parseInt(orderInfo);
            Order order = orderRepository.findById(orderId).orElse(null);

            if (order != null) {
                if (paymentStatus == 1) {
                    // Thanh toán thành công -> Cập nhật DB
                    order.setOrderStatus(OrderStatus.IN_PROGRESS); // Hoặc trạng thái PAID tùy logic
                    order.getPayment().setPaymentStatus(PaymentStatus.COMPLETED);
                    order.getPayment().setPaymentDate(new Date()); // convert paymentTime nếu cần
                    orderRepository.save(order);

                    result.put("status", "success");
                    result.put("message", "Thanh toán thành công");
                    result.put("data", order);
                } else {
                    // Thanh toán thất bại hoặc Hash không đúng
                    order.getPayment().setPaymentStatus(PaymentStatus.FAILED);
                    orderRepository.save(order);

                    result.put("status", "failed");
                    result.put("message", "Thanh toán thất bại");
                }
            }
        }
        return result;
    }

//    public List<OrderDetails> getOrdersByUser(String name) {
//        User user = (User) userDetailsService.loadUserByUsername(name);
//        List<Order> orders = orderRepository.findByUser(user);
//        return orders.stream().map(order -> {
//            return OrderDetails.builder()
//                    .id(order.getId())
//                    .orderDate(order.getOrderDate())
//                    .orderStatus(order.getOrderStatus())
//                    .shipmentNumber(order.getShipmentTrackingNumber())
//                    .address(order.getAddress())
//                    .totalAmount(order.getTotalAmount())
//                    .orderItemList(getItemDetails(order.getOrderItemList()))
//                    .expectedDeliveryDate(order.getExpectedDeliveryDate())
//                    .build();
//        }).toList();
//    }

//    private List<OrderItemDetail> getItemDetails(List<OrderItem> orderItemList) {
//
//        return orderItemList.stream().map(orderItem -> {
//            return OrderItemDetail.builder()
//                    .id(orderItem.getId())
//                    .itemPrice(orderItem.getItemPrice())
//                    .product(orderItem.getProduct())
//                    .productVariantId(orderItem.getProductVariantId())
//                    .quantity(orderItem.getQuantity())
//                    .build();
//        }).toList();
//    }

//    public Map<String, String> updateStatus(String paymentVNPay, String status) {
//        try{
//            PaymentIntent paymentIntent= PaymentIntent.retrieve(paymentIntentId);
//            if (paymentIntent != null && paymentIntent.getStatus().equals("succeeded")) {
//                String orderId = paymentIntent.getMetadata().get("orderId") ;
//                Order order= orderRepository.findById(UUID.fromString(orderId)).orElseThrow(BadRequestException::new);
//                Payment payment = order.getPayment();
//                payment.setPaymentStatus(PaymentStatus.COMPLETED);
//                payment.setPaymentMethod(paymentIntent.getPaymentMethod());
//                order.setPaymentMethod(paymentIntent.getPaymentMethod());
//                order.setOrderStatus(OrderStatus.IN_PROGRESS);
//                order.setPayment(payment);
//                Order savedOrder = orderRepository.save(order);
//                Map<String,String> map = new HashMap<>();
//                map.put("orderId", String.valueOf(savedOrder.getId()));
//                return map;
//            }
//            else{
//                throw new IllegalArgumentException("PaymentIntent not found or missing metadata");
//            }
//        }
//        catch (Exception e){
//            throw new IllegalArgumentException("PaymentIntent not found or missing metadata");
//        }
//    }

//    public void cancelOrder(Integer id, Principal principal) {
//        User user = (User) userDetailsService.loadUserByUsername(principal.getName());
//        Order order = orderRepository.findById(id).get();
//        if(null != order && order.getUser().getId().equals(user.getId())){
//            order.setOrderStatus(OrderStatus.CANCELLED);
//            //logic to refund amount
//            orderRepository.save(order);
//        }
//        else{
//            new RuntimeException("Invalid request");
//        }
//    }
}
