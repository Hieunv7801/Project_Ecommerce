package com.earphone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.earphone.model.OrderDetails;
import com.earphone.repository.OrderDetailRepository;
import com.earphone.service.OrderDetailsService;

@RestController
@RequestMapping("api/orderDetail")
public class OrderDetailsController{
	@Autowired
	private OrderDetailRepository orderDetailRepository;
	
	@Autowired
	private OrderDetailsService orderDetailsService;
	@GetMapping
	public List<OrderDetails> getAll(){
		return orderDetailRepository.findAll();
	}
//	@GetMapping("/order-details/{user_id}")
//    public ResponseEntity<List<OrderDetails>> getOrderDetailsByUserId(@PathVariable("user_id") int userId) {
//        List<OrderDetails> orderDetails = orderDetailsService.getOrderDetailsByUserId(userId);
//        return ResponseEntity.ok(orderDetails);
//    }
	@GetMapping("/{id}")
	public ResponseEntity<List<OrderDetails>> getOrderDetailByOrderId(@PathVariable int id){
		List<OrderDetails> orderDetail = orderDetailRepository.findByOrdersId(id);
		return ResponseEntity.ok(orderDetail);
	}
}
