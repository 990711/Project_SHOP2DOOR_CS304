package com.shop.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Customer")
public class Customer extends Login{

//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private int user_id;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "name")
	private String name;
	
	@Column(name = "e-mail")
	private String email;
	
	@NotBlank(message = "this column must be filled!")
	@Size(max = 10, message = "Phone no must be 10 characters")
	@Column(name = "phone")
	private String phone;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "address")
	private String address;
	
	@ManyToMany()
	@JoinTable(name="customer_jobs",
				joinColumns = @JoinColumn(name="customer_id"),
				inverseJoinColumns = @JoinColumn(name="job_id"))
	private Set<ShopOwnerJob> appliedJobs = new HashSet<>();
	

	public Customer() {
		
	}
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL,mappedBy="customer")
	private List<Order> orders = new ArrayList<>();

	

	public Set<ShopOwnerJob> getAppliedJobs() {
		return appliedJobs;
	}

	public void setAppliedJobs(Set<ShopOwnerJob> appliedJobs) {
		this.appliedJobs = appliedJobs;
	}

	public Customer(@NotBlank(message = "this column must be filled!") String name, String email,
			@NotBlank(message = "this column must be filled!") @Size(max = 10, message = "Phone no must be 10 characters") String phone,
			@NotBlank(message = "this column must be filled!") String address, Set<ShopOwnerJob> appliedJobs,
			List<Order> orders) {
		super();
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.appliedJobs = appliedJobs;
		this.orders = orders;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	
	
	
	
}
