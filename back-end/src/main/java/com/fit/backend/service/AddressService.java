package com.fit.backend.service;

import com.fit.backend.auth.entity.User;
import com.fit.backend.dto.AddressRequest;
import com.fit.backend.entity.Address;
import com.fit.backend.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;

@Service
public class AddressService {
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AddressRepository addressRepository;

    // thêm địa chỉ
    public Address createAddress(@RequestBody AddressRequest addressRequest, Principal principal) {
        User user= (User) userDetailsService.loadUserByUsername(principal.getName());
        Address address = Address.builder()
                .fullName(addressRequest.getFullName())
                .phoneNumber(addressRequest.getPhoneNumber())
                .street(addressRequest.getStreet())
                .commune(addressRequest.getCommune())
                .ward(addressRequest.getWard())
                .cityOfProvince(addressRequest.getCityOfProvince())
                .user(user)
                .build();
        return addressRepository.save(address);
    }

    // xóa địa chỉ
    public void deleteAddress(Integer id) {
        addressRepository.deleteById(id);
    }
}
