package com.fit.backend.auth.service;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class PasswordResetStorage {
    // Key: Email, Value: Code|ExpiryTime
    private static final Map<String, String[]> storage = new ConcurrentHashMap<>();

    public static void save(String email, String code) {
        // Code hết hạn sau 5 phút (300000 ms)
        String expiry = String.valueOf(System.currentTimeMillis() + 5 * 60 * 1000);
        storage.put(email, new String[]{code, expiry});
    }

    public static String[] get(String email) {
        return storage.get(email);
    }

    public static void remove(String email) {
        storage.remove(email);
    }
}
