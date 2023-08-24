package com.earphone.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.earphone.model.Users;
import com.earphone.repository.OrderDetailRepository;
import com.earphone.repository.OrderRepository;
import com.earphone.repository.ProductRepository;
import com.earphone.repository.UserRepository;

@Service
public class StatisticsService {
	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private OrderDetailRepository orderDetailRepository;
	
	@Autowired
	private UserRepository userRepository;

	public long getTotalProductCount() {
		return productRepository.count();
	}

	public long getTotalOrderCount() {
		return orderRepository.count();
	}

	// thống kê đơn hàng (month - year)
	public Map<String, Long> getOrderCountByMonthAndYear() {
		return orderRepository.countOrdersByMonthAndYear();
	}
	
	// tổng tiền sản phẩm bán được
	public double getTotalRevenue() {
	    return orderDetailRepository.calculateTotalRevenue();
	}
	
	// khách hàng mua nhiều nhất
//	public Users getTopBuyingUser() {
//	    return userRepository.findByUsername();
//	}
}
