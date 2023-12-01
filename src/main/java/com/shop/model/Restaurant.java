package com.shop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Restaurant")
public class Restaurant extends Login{


	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "name")
	private String name;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "location")
	private String location;
	
	@NotBlank(message = "this column must be filled!")
	@Size(max = 10, message = "Phone no must be 10 characters")
	@Column(name = "contact")
	private String contact;
	
	@Column(name = "e-mail")
	private String email;
	
	

	public Restaurant() {
		
	}

	public Restaurant(@NotBlank(message = "this column must be filled!") String name,
			@NotBlank(message = "this column must be filled!") String location,
			@NotBlank(message = "this column must be filled!") @Size(max = 10, message = "Phone no must be 10 characters") String contact,
			String email) {
		super();
		this.name = name;
		this.location = location;
		this.contact = contact;
		this.email = email;
	}

	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
	
}
