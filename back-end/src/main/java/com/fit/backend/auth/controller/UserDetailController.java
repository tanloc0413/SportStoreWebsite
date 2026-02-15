package com.fit.backend.auth.controller;

import com.fit.backend.auth.dto.UpdateUserRequest;
import com.fit.backend.auth.dto.UserDetailsDto;
import com.fit.backend.auth.entity.User;
import com.fit.backend.auth.repository.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserDetailController {
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserDetailRepository userDetailRepository;

    @GetMapping("/profile")
    public ResponseEntity<UserDetailsDto> getUserProfile(Principal principal) {
        User user = (User) userDetailsService.loadUserByUsername(principal.getName());

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        UserDetailsDto userDetailsDto = UserDetailsDto.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .addressList(user.getAddressList())
                .authorityList(user.getAuthorities().toArray()).build();

        return new ResponseEntity<>(userDetailsDto, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(
                userDetailRepository.findAll(),
                HttpStatus.OK
        );
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody UpdateUserRequest request, Principal principal) {
        // 1. Lấy user hiện tại từ token
        User user = (User) userDetailsService.loadUserByUsername(principal.getName());

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        try {
            // 2. Cập nhật thông tin
            if (request.getFullName() != null && !request.getFullName().isEmpty()) {
                user.setFullName(request.getFullName());
            }

            if (request.getPhoneNumber() != null && !request.getPhoneNumber().isEmpty()) {
                // Kiểm tra xem SĐT mới có trùng với user khác không (nếu cần)
                // Ở đây ta gán trực tiếp, nếu DB set unique=true sẽ ném exception
                user.setPhoneNumber(request.getPhoneNumber());
            }

            user.setUpdatedOn(new java.util.Date()); // Cập nhật thời gian sửa

            // 3. Lưu xuống database
            userDetailRepository.save(user);

            // 4. Trả về thông tin mới nhất
            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (Exception e) {
            // Xử lý lỗi (ví dụ: trùng số điện thoại)
            return new ResponseEntity<>("Cập nhật thất bại. Có thể số điện thoại đã tồn tại.", HttpStatus.BAD_REQUEST);
        }
    }
}
