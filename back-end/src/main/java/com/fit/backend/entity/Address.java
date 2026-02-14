package com.fit.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fit.backend.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String fullName;

    private String phoneNumber;

    // đường
    private String street;

    // xã
    private String commune;

    // phường
    private String ward;

    // tỉnh hoặc thành phố
    private String cityOfProvince;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    @ToString.Exclude
    private User user;
}