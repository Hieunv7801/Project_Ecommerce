package com.earphone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.earphone.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public List<Object[]> getTopUsersWithTotalAmountSum(Pageable pageable) {
		return userRepository.findTopUsersWithTotalAmountSum(pageable);
	}
}
