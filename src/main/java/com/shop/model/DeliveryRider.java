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
@Table(name = "DeliveryRider")
public class DeliveryRider {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int user_id;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "name")
	private String name;
	
	@NotBlank(message = "this column must be filled!")
	@Size(max = 10, message = "Phone no must be 10 characters")
	@Column(name = "contact")
	private String contact;
	
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getArea_of_pref() {
		return area_of_pref;
	}

	public void setArea_of_pref(String area_of_pref) {
		this.area_of_pref = area_of_pref;
	}

	public String getLicense() {
		return license;
	}

	public void setLicense(String license) {
		this.license = license;
	}

	public String getVehicle_type() {
		return vehicle_type;
	}

	public void setVehicle_type(String vehicle_type) {
		this.vehicle_type = vehicle_type;
	}

	public String getVehicle_no() {
		return vehicle_no;
	}

	public void setVehicle_no(String vehicle_no) {
		this.vehicle_no = vehicle_no;
	}

	@Column(name = "e-mail")
	private String email;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "area of pref.")
	private String area_of_pref;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "license no")
	private String license;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "vehicle type")
	private String vehicle_type;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "vehicle no")
	private String vehicle_no;
	
	
	
}
