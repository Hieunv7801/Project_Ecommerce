package com.earphone.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.earphone.model.LoginRequest;
import com.earphone.model.Users;
import com.earphone.repository.UserRepository;

@RestController
@RequestMapping("api/users")
public class UserController {
	@Autowired
	private UserRepository userRepository;

	@GetMapping
	public List<Users> getAllUser() {
		return userRepository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Users> getUserId(@PathVariable int id) {
		Optional<Users> user = userRepository.findById(id);
		if (user.isPresent()) {
			return ResponseEntity.ok(user.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// thêm người dùng
	@PostMapping
	public Users addUser(@RequestBody Users users) {
		return userRepository.save(users);
	}

	// update
	@PutMapping
	public Users updateUser( @RequestBody Users updatedUser) {
		Users user = userRepository.findById(updatedUser.getId()).orElse(null);
		if (user != null) {
			user.setUsername(updatedUser.getUsername());
			user.setEmail(updatedUser.getEmail());
			user.setPassword(updatedUser.getPassword());
			user.setFullname(updatedUser.getFullname());
			user.setAddress(updatedUser.getAddress());
			user.setPhone(updatedUser.getPhone());
			return userRepository.save(user);
		} else {
			return null;
		}
	}
	//xóa theo  id
	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable int id) {
		 userRepository.deleteById(id);
	}
	
	@PostMapping("/login")

    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {

        String username = loginRequest.getUsername();

        String password = loginRequest.getPassword();

        Users user = userRepository.findByUsername(username);

        if (user == null || !user.getPassword().equals(password)) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Đăng nhập không thành công");

        }

        return ResponseEntity.ok(""+user.getId());

    }
	@PostMapping("/login_admin")
	public ResponseEntity<String> loginAdmin(@RequestBody LoginRequest loginRequest) {
	    String username = loginRequest.getUsername();
	    String password = loginRequest.getPassword();

	    Users user = userRepository.findByUsername(username);

	    if (user == null || !user.getPassword().equals(password)) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Đăng nhập không thành công");
	    }
	    // Kiểm tra role của người dùng
	    if ("admin".equals(user.getRole())) {
	        return ResponseEntity.ok(""+user.getId());
	    } else {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền truy cập trang admin");
	    }
	}

	
}
