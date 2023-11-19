package com.shop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "FoodSupplier")
public class FoodSupplier extends Login{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int user_id;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "name")
	private String name;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "contact")
	private String contact;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "address")
	private String address;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "e-mail")
	private String email;
	
	

	public FoodSupplier() {
		
	}

	public FoodSupplier(@NotBlank(message = "this column must be filled!") String name,
			@NotBlank(message = "this column must be filled!") String contact,
			@NotBlank(message = "this column must be filled!") String address,
			@NotBlank(message = "this column must be filled!") String email) {
		super();
		this.name = name;
		this.contact = contact;
		this.address = address;
		this.email = email;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
	
}
