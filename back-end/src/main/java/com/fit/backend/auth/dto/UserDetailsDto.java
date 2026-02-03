package com.fit.backend.auth.dto;

import com.fit.backend.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    private List<Address> addressList;
}
