package com.earphone.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.earphone.model.OrderDTO;
import com.earphone.model.Products;
import com.earphone.model.Users;
import com.earphone.service.OrderService;
import com.earphone.service.ProductService;
import com.earphone.service.StatisticsService;
import com.earphone.service.UserService;

@RestController
@RequestMapping("api/statistics")
public class StatisticsController {
	@Autowired
	private StatisticsService statisticsService;

	@Autowired
	private ProductService productService;

	@Autowired
	private UserService userService;

	@Autowired
	private OrderService orderService;

	@GetMapping("/products")
	public ResponseEntity<?> getProductStatistics() {
		long totalProducts = statisticsService.getTotalProductCount();
		return ResponseEntity.ok(totalProducts);
	}

	@GetMapping("/orders")
	public ResponseEntity<?> getOrderStatistics() {
		long totalOrders = statisticsService.getTotalOrderCount();
		return ResponseEntity.ok(totalOrders);
	}

	@GetMapping("/top-selling-products")
	public ResponseEntity<List<Products>> getTopSellingProducts() {
		List<Products> topSellingProducts = productService.getTopSellingProducts(5); // để lấy top sản phẩm bán chạy //
																						// nhất
		return ResponseEntity.ok(topSellingProducts);
	}

	@GetMapping("/top-user")
	public ResponseEntity<List<Object[]>> getTopUsers(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "3") int size) {
		Pageable pageable = PageRequest.of(page, size);
		List<Object[]> topUsers = userService.getTopUsersWithTotalAmountSum(pageable);
		return ResponseEntity.ok(topUsers);
	}

	@GetMapping("/total-amount/{year}/{month}")
	public List<OrderDTO> getOrderSummariesForMonth(@PathVariable int year, @PathVariable int month) {
		return orderService.getOrderSummariesForMonth(year, month);
	}
}
