package com.fit.backend.auth.service;

import com.fit.backend.auth.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public String sendMail(User user){
        String subject = "Xác thực email của bạn";
        String senderName = "Sport Store";
        String mailContent = "Xin chào " + user.getUsername() + ",\n";
        mailContent += "Mã xác thực của bạn là: " + user.getVerificationCode() + "\n";
        mailContent += "Vui lòng nhập mã sau để xác thực email!";
        mailContent +="\n";
        mailContent+= senderName;

        try{
            SimpleMailMessage mailMessage
                    = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(user.getEmail());
            mailMessage.setText(mailContent);
            mailMessage.setSubject(subject);
            javaMailSender.send(mailMessage);
        }
        catch (Exception e){
            return "Lỗi khi gửi email";
        }
        return "Gửi email";
    }
}