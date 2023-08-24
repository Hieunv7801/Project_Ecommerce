package com.earphone.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.earphone.model.Products;

public interface ProductRepository extends JpaRepository<Products, Integer>{
	@Query("SELECT p FROM Products p " +
		       "JOIN OrderDetails od ON p.id = od.products.id " +
		       "JOIN Orders o ON od.orders.id = o.id " +
		       "WHERE o.isconfirm = true " +
		       "GROUP BY p.id, p.name, p.price, p.description, p.image " +
		       "ORDER BY SUM(od.quantity) DESC")
	    List<Products> findTopSellingProducts(Pageable pageable);
}
