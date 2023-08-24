package com.earphone.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderRequest {
	private int user; 
    private Date orderDate; 
    private double totalAmount;
}
