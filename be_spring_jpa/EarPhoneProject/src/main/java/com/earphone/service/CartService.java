package com.earphone.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.earphone.model.Carts;
import com.earphone.model.Users;
import com.earphone.repository.CartRepository;
import com.earphone.repository.UserRepository;

@Service
public class CartService {
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	
	public List<Carts> getUserCart(int userId) {
        return cartRepository.findByUserId(userId);
    }

    public Carts addToCart(int userId, Carts cartItem) {
        // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
        Users user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new NotFoundException("Người dùng không tồn tại");
        }

        // Thiết lập người dùng cho cartItem
        cartItem.setUser(user);

        // Lưu sản phẩm vào giỏ hàng và trả về sản phẩm đã được lưu.
        return cartRepository.save(cartItem);
    }

    @Transactional
    public void deleteCartsByUser(Users user) {
    	cartRepository.deleteByUser(user);
    }
    
    
}
