package com.fit.backend.controller;

import com.fit.backend.dto.OrderRequest;
import com.fit.backend.entity.Order;
import com.fit.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/order")
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(
            @RequestBody OrderRequest orderRequest,
            Principal principal)
            throws Exception {
        Order orderResponse = orderService.createOrder(orderRequest,principal);

        return new ResponseEntity<>(orderResponse, HttpStatus.CREATED);
    }
}
