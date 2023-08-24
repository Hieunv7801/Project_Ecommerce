package com.earphone.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.earphone.model.Carts;
import com.earphone.model.Products;
import com.earphone.model.Users;

public interface CartRepository extends JpaRepository<Carts, Integer>{
	List<Carts> findByUserId(int userId);
	
	Optional<Carts> findByUserAndProduct(Users users, Products product);
	
	void deleteByUser(Users user);

	List<Carts> findAllByUser(Users user);
	
}
