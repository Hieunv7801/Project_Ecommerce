package com.earphone.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


import lombok.Data;


@Entity
@Data
public class Carts {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne
	private Users user; // Người dùng mua hàng
	
	@ManyToOne
	private Products product; // Sản phẩm trong giỏ hàng

	private int quantity;
}
