package com.earphone.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.earphone.model.Carts;
import com.earphone.model.OrderDetails;
import com.earphone.model.Orders;
import com.earphone.model.Users;
import com.earphone.repository.CartRepository;
import com.earphone.repository.OrderDetailRepository;
import com.earphone.repository.OrderRepository;
import com.earphone.repository.UserRepository;

@Service
public class OrderDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private OrderDetailRepository orderDetailRepository;

	@Autowired
	public OrderDetailsService(OrderDetailRepository orderDetailsRepository) {
		this.orderDetailRepository = orderDetailsRepository;
	}

	public boolean createNewOrder(int userId, double totalAmount) {
		Optional<Users> optionalUser = userRepository.findById(userId);

		if (optionalUser.isEmpty()) {
			return false;
		}

		Users user = optionalUser.get();
		// add to order
		Orders order = Orders.builder().user(user).orderDate(new Date()).totalAmount(totalAmount).isconfirm(false)
				.build();
		orderRepository.save(order);

		// add to order details
		List<Carts> carts = cartRepository.findAllByUser(user);
		carts.forEach(cart -> orderDetailRepository.save(
				OrderDetails.builder().orders(order).products(cart.getProduct()).quantity(cart.getQuantity()).build()));
		// remove from cart
		carts.forEach(cartRepository::delete);

		return true;
	}

	public List<OrderDetails> getOrderDetailsByUserId(int userId) {
		// Gọi phương thức trong OrderDetailsRepository để lấy thông tin chi tiết đơn
		// hàng theo user_id
		return orderDetailRepository.findByOrders_User_Id(userId);
	}
	
}
