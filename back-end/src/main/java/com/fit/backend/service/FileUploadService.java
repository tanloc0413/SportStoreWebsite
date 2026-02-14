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
//            String urlString =  fileHostName + "/" + storageZone+"/" + fileName;
//            URL url = new URL(urlString);
//            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//            connection.setRequestMethod("PUT");
//            connection.setRequestProperty("AccessKey", fileUploadKey);
//            connection.setRequestProperty("Content-Type", "application/octet-stream");
//            connection.setDoOutput(true);
//
//            long fileSize = file.getSize();
//
//            try (BufferedInputStream inputStream = new BufferedInputStream(file.getInputStream());
//                 BufferedOutputStream outputStream = new BufferedOutputStream(connection.getOutputStream())) {
//
//                byte[] buffer = new byte[8192];
//                int bytesRead;
//                while ((bytesRead = inputStream.read(buffer)) != -1) {
//                    outputStream.write(buffer, 0, bytesRead);
//                }
            // Tạo đường dẫn đầy đủ đến file
            Path uploadPath = Paths.get(uploadDir);

            // Tạo thư mục nếu chưa có
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

//            int responseCode = connection.getResponseCode();
//            String responseMsg = connection.getResponseMessage();
//            return responseCode;
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
