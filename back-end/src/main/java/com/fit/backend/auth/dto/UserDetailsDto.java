package com.fit.backend.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsDto {
    private Integer id;
    private String fullName;
    private String phoneNumber;
    private String email;
    private Object authorityList;

}
