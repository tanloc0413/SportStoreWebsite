package com.fit.backend.auth.service;

import com.fit.backend.auth.dto.RegistrationRequest;
import com.fit.backend.auth.dto.TempUser;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TempStorage {
    private static final Map<String, TempUser> storage = new ConcurrentHashMap<>();

    public static void save(RegistrationRequest req, String code) {
        storage.put(req.getEmail(),
                new TempUser(req, code,
                        System.currentTimeMillis() + 10 * 60 * 1000));
    }

    public static TempUser get(String email) {
        return storage.get(email);
    }

    public static void remove(String email) {
        storage.remove(email);
    }
}