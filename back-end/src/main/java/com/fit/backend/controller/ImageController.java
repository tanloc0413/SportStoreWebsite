package com.fit.backend.controller;

import com.fit.backend.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/file")
@CrossOrigin("*")
public class ImageController {
    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping
    public ResponseEntity<?> fileUpload(
            @RequestParam(value = "file",required = true) MultipartFile file,
            @RequestParam(value = "fileName",required = true) String fileName) {
        int statusCode = fileUploadService.uploadFile(file,fileName);
        return new ResponseEntity<>(statusCode == 201 ? HttpStatus.CREATED : HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/multiple")
    public ResponseEntity<List<String>> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        List<String> fileNames = new ArrayList<>();
        try {
            for (MultipartFile file : files) {
                String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                int statusCode = fileUploadService.uploadFile(file, fileName);
                if (statusCode == 200 || statusCode == 201) {
                    fileNames.add("http://localhost:8080/images/" + fileName);
                }
            }
            return ResponseEntity.ok(fileNames); // Trả về 200 kèm danh sách file
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
