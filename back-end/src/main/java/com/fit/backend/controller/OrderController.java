package com.fit.backend.controller;

import com.fit.backend.dto.OrderRequest;
import com.fit.backend.dto.OrderResponse;
import com.fit.backend.entity.Order;
import com.fit.backend.service.OrderService;
import com.fit.backend.service.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/order")
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private VNPayService vnPayService;

    @PostMapping
    public ResponseEntity<?> createOrder(
            @RequestBody OrderRequest orderRequest,
            Principal principal,
            HttpServletRequest request)
            throws Exception {
//        Order order = orderService.createOrder(orderRequest, principal);
//
//        OrderResponse orderResponse = OrderResponse.builder()
//                .orderId(order.getId())
//                .paymentMethod(order.getPaymentMethod())
//                .build();

        if(Objects.equals(orderRequest.getPaymentMethod(), "VNPay")) {
//            orderResponse.setCredentials(Map.of(
//                    "paymentUrl", vnPayService.createPaymentUrl(order, request)
//            ));
        }

//        return new ResponseEntity<>(orderResponse, HttpStatus.OK);
        return null;
    }

//    @GetMapping("/vnpay/callback")
//    public ResponseEntity<Map<String, String>> vnpayCallback(@RequestParam Map<String, String> params) {
//        return ResponseEntity.ok(vnPayService.processReturn(params));
//    }

//    @PostMapping("/update-payment")
//    public ResponseEntity<?> updatePaymentStatus(@RequestBody Map<String,String> request){
//        Map<String,String> response = orderService.updateStatus(request.get("paymentVNPay"),request.get("status"));
//        return new ResponseEntity<>(response,HttpStatus.OK);
//    }

//    @PostMapping("/cancel/{id}")
//    public ResponseEntity<?> cancelOrder(@PathVariable Integer id,Principal principal){
//        orderService.cancelOrder(id,principal);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    @GetMapping("/user")
//    public ResponseEntity<List<OrderDetails>> getOrderByUser(Principal principal) {
//        List<OrderDetails> orders = orderService.getOrdersByUser(principal.getName());
//        return new ResponseEntity<>(orders, HttpStatus.OK);
//    }

//    @PostMapping("/vnpay/callback")
//    public ResponseEntity<OrderResponse> vnpayCallback(@RequestParam Map<String, String> params) {
//        try {
//            log.info("Received VNPay callback for order: {}", params.get("vnp_TxnRef"));
//            OrderResponse response = orderService.processVNPayCallback(params);
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            log.error("Error processing VNPay callback", e);
//            throw new RuntimeException("Lỗi xử lý callback VNPay: " + e.getMessage());
//        }
//    }
//
//    @GetMapping("/vnpay/return")
//    public ResponseEntity<Map<String, Object>> vnpayReturn(@RequestParam Map<String, String> params) {
//        try {
//            OrderResponse response = orderService.processVNPayCallback(params);
//
//            Map<String, Object> result = Map.of(
//                    "success", "00".equals(params.get("vnp_ResponseCode")),
//                    "orderCode", response.getOrderCode(),
//                    "amount", response.getTotalAmount(),
//                    "message", "00".equals(params.get("vnp_ResponseCode")) ?
//                            "Thanh toán thành công" : "Thanh toán thất bại"
//            );
//
//            return ResponseEntity.ok(result);
//        } catch (Exception e) {
//            log.error("Error processing VNPay return", e);
//            return ResponseEntity.ok(Map.of(
//                    "success", false,
//                    "message", "Lỗi xử lý kết quả thanh toán"
//            ));
//        }
//    }
}
