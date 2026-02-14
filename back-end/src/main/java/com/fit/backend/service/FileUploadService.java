package com.fit.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileUploadService {
//    @Value("${FILE_ZONE}")
//    private String storageZone;
//
//    @Value("${FILE_UPLOAD_API_KEY}")
//    private String fileUploadKey;
//
//    @Value("${FILE_UPLOAD_HOST_URL}")
//    private String fileHostName;

    private final String uploadDir = "uploads/products/";

    public FileUploadService() {
        // Tạo thư mục nếu chưa tồn tại
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }

    public int uploadFile(MultipartFile file, String fileName) {
        try {
            // Tạo đường dẫn đầy đủ đến file
            Path uploadPath = Paths.get(uploadDir);

            // Tạo thư mục nếu chưa có
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Lưu file vào thư mục
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return 201; // Created
        }
        catch (Exception e) {
            e.printStackTrace();
            return 500;
        }
    }
}
