package com.earphone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.earphone.model.OrderDetails;

public interface OrderDetailRepository extends JpaRepository<OrderDetails, Integer> {
	List<OrderDetails> findByOrders_User_Id(int userId);

	List<OrderDetails> findByOrdersId(int id);
	
	//tổng tiền các sản phẩm bán được
	@Query("SELECT COALESCE(SUM(od.products.price * od.quantity), 0) FROM OrderDetails od")
	double calculateTotalRevenue();

}
