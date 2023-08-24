package com.earphone.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.earphone.model.Users;

public interface UserRepository extends JpaRepository<Users, Integer> {
	Users findByUsername(String username);

	@Query("SELECT u, SUM(o.totalAmount) AS totalAmountSum FROM Users u " + "JOIN Orders o ON u.id = o.user.id "
			+ "WHERE o.isconfirm = true "
			+ "GROUP BY u.id, u.username, u.email, u.password, u.fullname, u.phone, u.address, u.role "
			+ "ORDER BY totalAmountSum DESC")
	List<Object[]> findTopUsersWithTotalAmountSum(Pageable pageable);
}
