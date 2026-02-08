//package com.fit.backend.service;
//
//import com.fit.backend.config.VNPayConfig;
//import com.fit.backend.entity.Order;
//import jakarta.servlet.http.HttpServletRequest;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//import java.io.UnsupportedEncodingException;
//import java.net.URLEncoder;
//import java.nio.charset.StandardCharsets;
//import java.text.SimpleDateFormat;
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.*;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j
//public class VNPayService {
//
//    public String createPaymentUrl(Order order, String returnUrl, HttpServletRequest request) {
//        try {
//            String vnp_Version = "2.1.0";
//            String vnp_Command = "pay";
//            String orderType = "other";
//
//            // Convert BigDecimal to long (VND)
//            long amount = order.getTotalAmount().multiply(new java.math.BigDecimal(100)).longValue();
//
//            String vnp_TxnRef = order.getOrderCode();
//            String vnp_IpAddr = VNPayConfig.getIpAddress(request);
//
//            String vnp_TmnCode = VNPayConfig.vnp_TmnCode;
//
//            Map<String, String> vnp_Params = new HashMap<>();
//            vnp_Params.put("vnp_Version", vnp_Version);
//            vnp_Params.put("vnp_Command", vnp_Command);
//            vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
//            vnp_Params.put("vnp_Amount", String.valueOf(amount));
//            vnp_Params.put("vnp_CurrCode", "VND");
//
//            vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
//            vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
//            vnp_Params.put("vnp_OrderType", orderType);
//
//            vnp_Params.put("vnp_Locale", "vn");
//            vnp_Params.put("vnp_ReturnUrl", returnUrl);
//            vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
//
//            // Thời gian tạo giao dịch
//            Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
//            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
//            String vnp_CreateDate = formatter.format(cld.getTime());
//            vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
//
//            // Thời gian hết hạn (15 phút)
//            cld.add(Calendar.MINUTE, 15);
//            String vnp_ExpireDate = formatter.format(cld.getTime());
//            vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
//
//            // Sắp xếp tham số và tạo chuỗi query
//            List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
//            Collections.sort(fieldNames);
//            StringBuilder hashData = new StringBuilder();
//            StringBuilder query = new StringBuilder();
//
//            Iterator<String> itr = fieldNames.iterator();
//            while (itr.hasNext()) {
//                String fieldName = itr.next();
//                String fieldValue = vnp_Params.get(fieldName);
//                if ((fieldValue != null) && (fieldValue.length() > 0)) {
//                    // Build hash data
//                    hashData.append(fieldName);
//                    hashData.append('=');
//                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
//                    // Build query
//                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
//                    query.append('=');
//                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
//                    if (itr.hasNext()) {
//                        query.append('&');
//                        hashData.append('&');
//                    }
//                }
//            }
//
//            String queryUrl = query.toString();
//            String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.vnp_HashSecret, hashData.toString());
//            queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
//            String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;
//
//            log.info("Generated VNPay payment URL for order {}: {}", order.getOrderCode(), paymentUrl);
//            return paymentUrl;
//
//        } catch (UnsupportedEncodingException e) {
//            log.error("Error creating VNPay payment URL for order {}: {}", order.getOrderCode(), e.getMessage());
//            throw new RuntimeException("Lỗi tạo URL thanh toán VNPay", e);
//        }
//    }
//
//    public boolean validateCallback(Map<String, String> params) {
//        try {
//            String vnp_SecureHash = params.get("vnp_SecureHash");
//            params.remove("vnp_SecureHashType");
//            params.remove("vnp_SecureHash");
//
//            String signValue = VNPayConfig.hashAllFields(params);
//            return signValue.equals(vnp_SecureHash);
//        } catch (Exception e) {
//            log.error("Error validating VNPay callback: {}", e.getMessage());
//            return false;
//        }
//    }
//
//    public VNPayCallbackResult processCallback(Map<String, String> params) {
//        VNPayCallbackResult result = new VNPayCallbackResult();
//
//        try {
//            result.setOrderCode(params.get("vnp_TxnRef"));
//            result.setTransactionId(params.get("vnp_TransactionNo"));
//            result.setResponseCode(params.get("vnp_ResponseCode"));
//            result.setAmount(Long.parseLong(params.get("vnp_Amount")) / 100);
//            result.setBankCode(params.get("vnp_BankCode"));
//            result.setPayDate(params.get("vnp_PayDate"));
//
//            // Check if transaction is successful
//            result.setSuccess("00".equals(result.getResponseCode()));
//
//            if (!result.isSuccess()) {
//                result.setMessage(getErrorMessage(result.getResponseCode()));
//            } else {
//                result.setMessage("Thanh toán thành công");
//            }
//
//        } catch (Exception e) {
//            log.error("Error processing VNPay callback: {}", e.getMessage());
//            result.setSuccess(false);
//            result.setMessage("Lỗi xử lý kết quả thanh toán");
//        }
//
//        return result;
//    }
//
//    private String getErrorMessage(String responseCode) {
//        switch (responseCode) {
//            case "07": return "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).";
//            case "09": return "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.";
//            case "10": return "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần";
//            case "11": return "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.";
//            case "12": return "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.";
//            case "13": return "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP).";
//            case "24": return "Giao dịch không thành công do: Khách hàng hủy giao dịch";
//            case "51": return "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.";
//            case "65": return "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.";
//            case "75": return "Ngân hàng thanh toán đang bảo trì.";
//            case "79": return "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định.";
//            default: return "Giao dịch thất bại";
//        }
//    }
//
//    // Inner class for callback result
//    public static class VNPayCallbackResult {
//        private String orderCode;
//        private String transactionId;
//        private String responseCode;
//        private long amount;
//        private String bankCode;
//        private String payDate;
//        private boolean success;
//        private String message;
//
//        // Getters and Setters
//        public String getOrderCode() { return orderCode; }
//        public void setOrderCode(String orderCode) { this.orderCode = orderCode; }
//        public String getTransactionId() { return transactionId; }
//        public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
//        public String getResponseCode() { return responseCode; }
//        public void setResponseCode(String responseCode) { this.responseCode = responseCode; }
//        public long getAmount() { return amount; }
//        public void setAmount(long amount) { this.amount = amount; }
//        public String getBankCode() { return bankCode; }
//        public void setBankCode(String bankCode) { this.bankCode = bankCode; }
//        public String getPayDate() { return payDate; }
//        public void setPayDate(String payDate) { this.payDate = payDate; }
//        public boolean isSuccess() { return success; }
//        public void setSuccess(boolean success) { this.success = success; }
//        public String getMessage() { return message; }
//        public void setMessage(String message) { this.message = message; }
//    }
//}