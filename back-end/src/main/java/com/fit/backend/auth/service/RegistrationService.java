package com.fit.backend.auth.service;

import com.fit.backend.auth.dto.RegistrationRequest;
import com.fit.backend.auth.dto.RegistrationResponse;
import com.fit.backend.auth.dto.TempUser;
import com.fit.backend.auth.entity.User;
import com.fit.backend.auth.helper.VerificationCodeGenerator;
import com.fit.backend.auth.repository.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ServerErrorException;

import java.util.Date;

@Service
public class RegistrationService {

    @Autowired
    private UserDetailRepository userDetailRepository;

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    public RegistrationResponse createUser(RegistrationRequest request) {
        if(userDetailRepository.findByEmail(request.getEmail()) != null) {
            return RegistrationResponse.builder()
                    .code(400)
                    .message("Email đã tồn tại!")
                    .build();
        }

        String code = VerificationCodeGenerator.generateCode();

        // chỉ gửi code
        emailService.sendMail(
                request.getEmail(),
                request.getFullName(),
                code
        );

        TempStorage.save(request, code);

        return RegistrationResponse.builder()
                .code(200)
                .message("Vui lòng nhập mã xác thực")
                .build();
    }


    public void verifyUser(String userName) {
        User user = userDetailRepository.findByEmail(userName);
        user.setEnable(true);
        userDetailRepository.save(user);
    }

    public void createUserFromTemp(TempUser temp) {
        RegistrationRequest req = temp.getRequest();

        User user = new User();
        user.setEmail(req.getEmail());
        user.setFullName(req.getFullName());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setEnable(true);
        user.setProvider("manual");

        // set role lúc verify thành công
        user.setAuthorities(authorityService.getUserAuthority());

        userDetailRepository.save(user);
    }
}
