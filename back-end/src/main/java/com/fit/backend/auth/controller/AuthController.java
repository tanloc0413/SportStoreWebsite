package com.fit.backend.auth.controller;

import com.fit.backend.auth.config.JWTTokenHelper;
import com.fit.backend.auth.dto.*;
import com.fit.backend.auth.entity.User;
import com.fit.backend.auth.helper.VerificationCodeGenerator;
import com.fit.backend.auth.repository.UserDetailRepository;
import com.fit.backend.auth.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerErrorException;

import java.security.Principal;
import java.util.Date;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RegistrationService registrationService;

    @Autowired
    JWTTokenHelper jwtTokenHelper;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    private UserDetailRepository userDetailRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<UserToken> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication= UsernamePasswordAuthenticationToken
                    .unauthenticated(
                            loginRequest.getUserName(),
                            loginRequest.getPassword()
                    );

            Authentication authenticationResponse = this.authenticationManager.authenticate(authentication);

            if(authenticationResponse.isAuthenticated()) {
                User user= (User) authenticationResponse.getPrincipal();
                if(!user.isEnabled()) {
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }

                String token = jwtTokenHelper.generateToken(user.getEmail());
                UserToken userToken= UserToken.builder().token(token).build();
                return new ResponseEntity<>(userToken,HttpStatus.OK);
            }

        } catch(BadCredentialsException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@RequestBody RegistrationRequest request) {
        RegistrationResponse registrationResponse = registrationService.createUser(request);

        return new ResponseEntity<>(registrationResponse,
                registrationResponse.getCode() == 200 ? HttpStatus.OK: HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String,String> map) {
        String email = map.get("userName");
        String code = map.get("code");

        TempUser temp = TempStorage.get(email);

        if(temp == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if(System.currentTimeMillis() > temp.getExpiry()) {
            TempStorage.remove(email);
            return new ResponseEntity<>(HttpStatus.GONE);
        }

        if(!temp.getCode().equals(code)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        registrationService.createUserFromTemp(temp);
        TempStorage.remove(email);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Principal principal) {
        if (principal == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User user = userDetailRepository.findByEmail(principal.getName());
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        if (request.getCurrentPassword() == null || request.getNewPassword() == null) {
            return new ResponseEntity<>("Vui lòng nhập đầy đủ thông tin", HttpStatus.BAD_REQUEST);
        }

        if (request.getNewPassword().length() < 5) {
            return new ResponseEntity<>("Mật khẩu mới phải có ít nhất 5 ký tự", HttpStatus.BAD_REQUEST);
        }

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            return new ResponseEntity<>("Mật khẩu hiện tại không chính xác", HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setUpdatedOn(new Date());
        userDetailRepository.save(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        User user = userDetailRepository.findByEmail(request.getEmail());
        if (user == null) {
            // Trả về OK để tránh lộ thông tin user, hoặc BAD_REQUEST tùy chính sách bảo mật
            return new ResponseEntity<>("Email không tồn tại trong hệ thống", HttpStatus.BAD_REQUEST);
        }

        String code = VerificationCodeGenerator.generateCode(); // [cite: 130]
        PasswordResetStorage.save(request.getEmail(), code);

        // Gửi email (cần thêm method này vào EmailService như bước 3)
        emailService.sendForgotPasswordMail(request.getEmail(), code);

        return new ResponseEntity<>("Mã xác nhận đã được gửi", HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        String[] data = PasswordResetStorage.get(request.getEmail());

        if (data == null) {
            return new ResponseEntity<>("Yêu cầu không hợp lệ hoặc đã hết hạn", HttpStatus.BAD_REQUEST);
        }

        String savedCode = data[0];
        long expiry = Long.parseLong(data[1]);

        if (System.currentTimeMillis() > expiry) {
            PasswordResetStorage.remove(request.getEmail());
            return new ResponseEntity<>("Mã xác nhận đã hết hạn", HttpStatus.BAD_REQUEST);
        }

        if (!savedCode.equals(request.getCode())) {
            return new ResponseEntity<>("Mã xác nhận không chính xác", HttpStatus.BAD_REQUEST);
        }

        User user = userDetailRepository.findByEmail(request.getEmail()); // [cite: 132]
        if (user != null) {
            user.setPassword(passwordEncoder.encode(request.getNewPassword())); // [cite: 68]
            userDetailRepository.save(user);
            PasswordResetStorage.remove(request.getEmail());
            return new ResponseEntity<>("Đổi mật khẩu thành công", HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}