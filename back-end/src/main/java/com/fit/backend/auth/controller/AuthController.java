package com.fit.backend.auth.controller;

import com.fit.backend.auth.config.JWTTokenHelper;
import com.fit.backend.auth.dto.*;
import com.fit.backend.auth.entity.User;
import com.fit.backend.auth.helper.VerificationCodeGenerator;
import com.fit.backend.auth.repository.UserDetailRepository;
import com.fit.backend.auth.service.AuthorityService;
import com.fit.backend.auth.service.EmailService;
import com.fit.backend.auth.service.RegistrationService;
import com.fit.backend.auth.service.TempStorage;
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

}