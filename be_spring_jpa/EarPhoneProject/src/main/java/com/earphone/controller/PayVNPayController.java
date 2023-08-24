package com.earphone.controller;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.earphone.config.CofigVNPay;
import com.earphone.model.VNPayRequest;
@RestController
public class PayVNPayController {
	@PostMapping("/create-payment")
	public ResponseEntity<String> createPayment(@RequestBody VNPayRequest req) {
		int amount = req.getAmount() * 100;
		Map<String, String> vnpParams = new HashMap<>();
		vnpParams.put("vnp_Version", CofigVNPay.VNP_VERSION);
		vnpParams.put("vnp_Command", CofigVNPay.VNP_COMMAND);
		vnpParams.put("vnp_TmnCode", CofigVNPay.VNP_TIME_CODE);
		vnpParams.put("vnp_Amount", String.valueOf(amount));
		vnpParams.put("vnp_CurrCode", CofigVNPay.VNP_CURR_CODE);
		vnpParams.put("vnp_OrderInfo", req.getVnpOrderInfo());
		vnpParams.put("vnp_OrderType", CofigVNPay.VNP_ORDER_TYPE);
		vnpParams.put("vnp_BankCode", CofigVNPay.VNP_BANK_CODE);
		vnpParams.put("vnp_TxnRef", CofigVNPay.getRandomNumber(8));
		vnpParams.put("vnp_Locale", "vn");
		vnpParams.put("vnp_IpAddr", CofigVNPay.DEFAULT_IP);
		vnpParams.put("vnp_ReturnUrl", req.getVnpReturnUrl());

		Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		String vnpCreateDate = formatter.format(cld.getTime());
		vnpParams.put("vnp_CreateDate", vnpCreateDate);
		cld.add(Calendar.MINUTE, 15);
		vnpParams.put("vnp_ExpireDate", formatter.format(cld.getTime()));

		// Build data to hash and query string
		List<String> fieldNames = new ArrayList<>(vnpParams.keySet());
		Collections.sort(fieldNames);
		StringBuilder hashData = new StringBuilder();
		StringBuilder query = new StringBuilder();
		Iterator<String> itr = fieldNames.iterator();

		while (itr.hasNext()) {
			String fieldName = itr.next();
			String fieldValue = vnpParams.get(fieldName);
			if ((fieldValue != null) && (!fieldValue.isEmpty())) {
				// Build hash data
				hashData.append(fieldName);
				hashData.append('=');
				hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
				// Build query
				query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
				query.append('=');
				query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
				if (itr.hasNext()) {
					query.append('&');
					hashData.append('&');
				}
			}
		}
		String queryUrl = query.toString();
		String vnpSecureHash = CofigVNPay.hmacSHA512(CofigVNPay.VNP_HASH_SECRET, hashData.toString());
		queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
		String paymentUrl = CofigVNPay.VNP_PAY_URL + "?" + queryUrl;

		return ResponseEntity.ok().body(paymentUrl);
	}
}
