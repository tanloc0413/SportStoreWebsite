package com.fit.backend.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TempUser {
    private RegistrationRequest request;
    private String code;
    private long expiry;
}