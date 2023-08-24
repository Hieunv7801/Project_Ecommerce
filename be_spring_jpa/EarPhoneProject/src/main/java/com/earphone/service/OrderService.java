package com.earphone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.earphone.model.OrderDTO;
import com.earphone.model.Orders;
import com.earphone.repository.OrderRepository;

@Service
public class OrderService {
	@Autowired
	private OrderRepository orderRepository;

	// xác nhận đơn hàng
	public void confirmOrder(int id) {
		Orders order = orderRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Order not found"));
		order.setIsconfirm(true);
		orderRepository.save(order);
	}

	  public List<OrderDTO> getOrderSummariesForMonth(int year, int month) {
	        return orderRepository.getOrderSummariesForMonth(year, month);
	    }
}
