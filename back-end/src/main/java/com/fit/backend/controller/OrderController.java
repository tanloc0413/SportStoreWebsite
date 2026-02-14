package com.fit.backend.controller;

import com.fit.backend.dto.OrderRequest;
import com.fit.backend.dto.OrderResponse;
import com.fit.backend.entity.Order;
import com.fit.backend.repository.OrderRepository;
import com.fit.backend.service.OrderService;
import com.fit.backend.service.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/order")
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private VNPayService vnPayService;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    public ResponseEntity<?> createOrder(
            @RequestBody OrderRequest orderRequest,
            Principal principal,
            HttpServletRequest request) throws Exception {

        OrderResponse orderResponse = orderService.createOrder(orderRequest, principal, request);

        return new ResponseEntity<>(orderResponse,HttpStatus.OK);
    }

//    // Thêm Endpoint nhận kết quả từ VNPay (Frontend sẽ gọi cái này)
//    @GetMapping("/vnpay-callback")
//    public ResponseEntity<?> vnpayCallback(@RequestParam Map<String, String> params) {
//        String responseCode = params.get("vnp_ResponseCode");
//        String txnRef = params.get("vnp_TxnRef");
//        Integer orderId = Integer.parseInt(txnRef.split("_")[0]);
//
//        if ("00".equals(responseCode)) {
//            orderService.updatePaymentStatus(orderId, "COMPLETED"); // Cần viết hàm này trong service
//            return ResponseEntity.ok("Success");
//        }
//        return ResponseEntity.badRequest().body("Failed");
//    }
//
    // Endpoint xử lý callback từ Frontend
    @GetMapping("/vnpay/return")
    public ResponseEntity<Map<String, Object>> vnpayReturn(HttpServletRequest request) {
        Map<String, Object> result = orderService.processPaymentReturn(request);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

//        if (result == 1) {
//            // Thanh toán thành công -> Cập nhật trạng thái đơn hàng
//            orderService.updatePaymentStatus(orderId, "COMPLETED");
//            return new ResponseEntity<>(Map.of("status", "success", "message", "Thanh toán thành công"), HttpStatus.OK);
//        } else {
//            // Thanh toán thất bại
//            orderService.updatePaymentStatus(orderId, "FAILED");
//            return new ResponseEntity<>(Map.of("status", "failed", "message", "Thanh toán thất bại"), HttpStatus.BAD_REQUEST);
//        }
//    }

//    @PostMapping("/update-payment")
//    public ResponseEntity<?> updatePaymentStatus(@RequestBody Map<String,String> request){
//        Map<String,String> response = orderService.updateStatus(request.get("paymentIntent"),request.get("status"));
//        return new ResponseEntity<>(response,HttpStatus.OK);
//    }
//
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

//    @PostMapping
//    public ResponseEntity<?> createOrder(
//            @RequestBody OrderRequest orderRequest,
//            Principal principal,
//            HttpServletRequest request)
//            throws Exception {
//        Order order = orderService.createOrder(orderRequest, principal, request);
//
//        OrderResponse orderResponse = OrderResponse.builder()
//                .orderId(order.getId())
//                .paymentMethod(order.getPaymentMethod())
//                .build();
//
//
//        if(Objects.equals(orderRequest.getPaymentMethod(), "VNPay")) {
//            orderResponse.setCredentials(Map.of(
//                    "paymentUrl", vnPayService.createPaymentUrl(order, request)
//            ));
//        }

//        OrderResponse orderResponse = OrderResponse.builder()
//                .orderId(order.getId())
//                .paymentMethod(order.getPaymentMethod())
//                .build();

//        if(Objects.equals(orderRequest.getPaymentMethod(), "VNPay")) {
////            orderResponse.setCredentials(Map.of(
////                    "paymentUrl", vnPayService.createPaymentUrl(order, request)
////            ));
//        }

//        return new ResponseEntity<>(orderResponse, HttpStatus.OK);
//        return null;
//        return ResponseEntity.badRequest().build();
//    }

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
