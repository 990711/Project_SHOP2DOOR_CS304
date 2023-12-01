package com.shop.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "ShopOwner")
public class ShopOwner extends Login{


	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "shop name")
	private String shop_name;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "contact")
	private String contact;
	
	@Column(name = "branch")
	private String branch;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "location")
	private String location;
	
	@Column(name = "e-mail")
	private String email;

	public ShopOwner() {
		
	}

	public ShopOwner(@NotBlank(message = "this column must be filled!") String shop_name,
			@NotBlank(message = "this column must be filled!") String contact, String branch,
			@NotBlank(message = "this column must be filled!") String location, String email) {
		super();
		this.shop_name = shop_name;
		this.contact = contact;
		this.branch = branch;
		this.location = location;
		this.email = email;
	}


	public String getShop_name() {
		return shop_name;
	}

	public void setShop_name(String shop_name) {
		this.shop_name = shop_name;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
	
}
