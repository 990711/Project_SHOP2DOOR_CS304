package com.shop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Role")

public class Role {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int rider_id;
	
	@Column(name="role_name")
	private String role_name;
	
	public Role(){
		
	}
	
	public Role(String name) {
		super();
		this.role_name = name;
	}

	public int getRider_id() {
		return rider_id;
	}

	public void setRider_id(int rider_id) {
		this.rider_id = rider_id;
	}

	public String getRole_name() {
		return role_name;
	}

	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}
	
	
	
}
