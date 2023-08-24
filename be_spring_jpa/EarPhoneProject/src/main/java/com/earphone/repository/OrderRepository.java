package com.earphone.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.earphone.model.OrderDTO;
import com.earphone.model.Orders;

public interface OrderRepository extends JpaRepository<Orders, Integer> {
	@Query("SELECT CONCAT(MONTH(o.orderDate), '-', YEAR(o.orderDate)) AS monthYear, COUNT(o.id) AS orderCount "
			+ "FROM Orders o " + "GROUP BY CONCAT(MONTH(o.orderDate), '-', YEAR(o.orderDate))")
	Map<String, Long> countOrdersByMonthAndYear();

	@Query("SELECT NEW com.earphone.model.OrderDTO(DAY(o.orderDate), SUM(o.totalAmount)) " +
	           "FROM Orders o " +
	           "WHERE o.isconfirm = true " +
	           "AND YEAR(o.orderDate) = :year " +
	           "AND MONTH(o.orderDate) = :month " +
	           "GROUP BY DAY(o.orderDate)")
	    List<OrderDTO> getOrderSummariesForMonth(int year, int month);
}
