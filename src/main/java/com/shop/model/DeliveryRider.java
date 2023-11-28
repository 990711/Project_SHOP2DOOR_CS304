package com.shop.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "DeliveryRider")
public class DeliveryRider extends Login{

//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private int user_id;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "name")
	private String name;
	
	@NotBlank(message = "this column must be filled!")
	@Size(max = 10, message = "Phone no must be 10 characters")
	@Column(name = "contact")
	private String contact;
	
	
	@OneToMany(cascade = CascadeType.ALL,mappedBy="rider")
	private List<Order> orders = new ArrayList<>();
	
	
	public DeliveryRider() {
		
	}

	


	public DeliveryRider(@NotBlank(message = "this column must be filled!") String name,
			@NotBlank(message = "this column must be filled!") @Size(max = 10, message = "Phone no must be 10 characters") String contact,
			List<Order> orders, String email, @NotBlank(message = "this column must be filled!") String area_of_pref,
			@NotBlank(message = "this column must be filled!") String license,
			@NotBlank(message = "this column must be filled!") String vehicle_type,
			@NotBlank(message = "this column must be filled!") String vehicle_no) {
		super();
		this.name = name;
		this.contact = contact;
		this.orders = orders;
		this.email = email;
		this.area_of_pref = area_of_pref;
		this.license = license;
		this.vehicle_type = vehicle_type;
		this.vehicle_no = vehicle_no;
	}




	public List<Order> getOrders() {
		return orders;
	}




	public void setOrders(List<Order> orders) {
		this.orders = orders;
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
