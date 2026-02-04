package com.fit.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressRequest {
    private String fullName;
    private String street;
    private String commune;
    private String ward;
    private String cityOfProvince;
    private String phoneNumber;
}