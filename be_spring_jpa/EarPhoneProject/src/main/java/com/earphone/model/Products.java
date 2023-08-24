package com.earphone.model;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
	
	@Entity
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public class Products {
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;
		@Column(columnDefinition = "NVARCHAR(30)")
	    private String name;
	    private double price;
	    @Column(columnDefinition = "NVARCHAR(250)")
	    private String description;
		private String image;
	}
