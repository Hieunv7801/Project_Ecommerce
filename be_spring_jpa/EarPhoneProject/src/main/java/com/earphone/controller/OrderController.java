package com.earphone.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.earphone.model.OrderRequest;
import com.earphone.model.Orders;
import com.earphone.model.Users;
import com.earphone.repository.OrderRepository;
import com.earphone.repository.UserRepository;
import com.earphone.service.OrderDetailsService;
import com.earphone.service.OrderService;

@RestController
@RequestMapping("api/order")
public class OrderController {
	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private OrderDetailsService orderDetailsService;
	
	@Autowired
	private OrderService orderService;
	
	@GetMapping
	public List<Orders> getAllOrders() {
		return orderRepository.findAll();
	}

	@PostMapping
	public Orders addOrder(@RequestBody OrderRequest orderRequest) {
		Users users = userRepository.findById(orderRequest.getUser()).get();
		Orders order = new Orders();
		order.setUser(users);
		order.setOrderDate(new Date());
		order.setTotalAmount(orderRequest.getTotalAmount());

		return orderRepository.save(order);
	}
	@DeleteMapping("/{id}")
	public void deleteOrder(@PathVariable int id) {
		 orderRepository.deleteById(id); 
	}
	@PostMapping("/{userId}/{totalPayment}")
	public ResponseEntity<Boolean> addNewOrder (@PathVariable int userId,@PathVariable double totalPayment) {
		boolean status = orderDetailsService.createNewOrder(userId,totalPayment);
		
		return ResponseEntity.ok().body(status);
	}
	@PutMapping("/{id}")
    public ResponseEntity<String> confirmOrder(@PathVariable int id) {
        orderService.confirmOrder(id);
        return ResponseEntity.ok("Order confirmed");
    }
	
}
