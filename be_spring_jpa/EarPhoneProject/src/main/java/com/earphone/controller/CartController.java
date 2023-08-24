package com.earphone.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.earphone.form.CartForm;
import com.earphone.model.Carts;
import com.earphone.model.Products;
import com.earphone.model.Users;
import com.earphone.repository.CartRepository;
import com.earphone.repository.ProductRepository;
import com.earphone.repository.UserRepository;
import com.earphone.service.CartService;
import com.fasterxml.jackson.databind.util.ArrayBuilders.IntBuilder;

@RestController
@RequestMapping("api/cart")
public class CartController {
	@Autowired
	private CartRepository cartRepository;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CartService cartService;

	@GetMapping
	public List<Carts> getAllCart() {
		return cartRepository.findAll();
	}

	@PostMapping
	public Carts addCart(@RequestBody CartForm cartFrom) {
		System.err.println(cartFrom);
		Products products = productRepository.findById(cartFrom.getId()).orElse(null);
		Users users = userRepository.findById(cartFrom.getUser()).orElse(null);

		Carts carts;
		Optional<Carts> optional = cartRepository.findByUserAndProduct(users, products);
		if (optional.isPresent()) {
			carts = optional.get();
			carts.setQuantity(carts.getQuantity() + cartFrom.getQuantity());
		} else {
			carts = new Carts();
			carts.setUser(users);
			carts.setProduct(products);
			carts.setQuantity(cartFrom.getQuantity());
		}

		return cartRepository.save(carts);
	}

	@GetMapping("/{userId}/cart")
	public ResponseEntity<List<Carts>> getUserCartt(@PathVariable int userId) {
		List<Carts> userCart = cartService.getUserCart(userId);
		return ResponseEntity.ok(userCart);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Carts> deleteCart(@PathVariable int id) {
		Optional<Carts> existingCart = cartRepository.findById(id);
		if (existingCart.isPresent()) {
			cartRepository.deleteById(id);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/{id}/user")
	public ResponseEntity<Users> getUserFromCart(@PathVariable("id") int cartId) {
		Carts cart = cartRepository.findById(cartId).orElse(null);
		if (cart == null) {
			return ResponseEntity.notFound().build();
		}
		Users user = cart.getUser();
		return ResponseEntity.ok(user);
	}
	@DeleteMapping("/delete/{userId}")
    public void deleteCartsByUser(@PathVariable int userId) {
        Users user = userRepository.getById(userId);
        cartService.deleteCartsByUser(user);
    }
}
