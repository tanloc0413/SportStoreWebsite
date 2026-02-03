package com.fit.backend.auth.service;

import com.fit.backend.auth.entity.User;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public String sendMail(String email, String fullName, String code) {
        String subject = "Mã xác thực email của bạn!";
        String senderName = "Sport Store";

        String mailContent = """
        <p>Xin chào, %s</p>
        <p>Mã xác thực của bạn là:
            <b>%s</b>
        </p>
        <p>Mã có hiệu lực trong vòng 10 phút.</p>
        <br>
        <p style="font-size:18px;">
            <b>%s</b>
        </p>
    """.formatted(fullName, code, senderName);

        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(sender);
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(mailContent, true);

            javaMailSender.send(message);

        } catch(Exception e) {
            return "Lỗi khi gửi email";
        }

        return "Gửi email";
    }

}