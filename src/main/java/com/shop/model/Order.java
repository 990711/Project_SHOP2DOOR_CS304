package com.shop.model;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long order_id;

	@Column
	private LocalDate date;

	@Column
	private LocalTime time;

	@Column
	private String description;

	@Column
	private float Total;

	@Column
	private LocalTime delivery_time;

	@Column
	private String action;

	@Column
	private boolean deleted = false;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "customer_id")
	private Customer customer;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "delivery_id")
	private DeliveryRider rider;

//	@ManyToMany()
//	@JoinTable(name="order_items",
//				joinColumns = @JoinColumn(name="order_id"),
//				inverseJoinColumns = @JoinColumn(name="item_id"))
//	private Set<Item> items = new HashSet<>();

	@OneToMany(mappedBy = "order")
	private Set<ItemQuantity> itemQuantity = new HashSet<ItemQuantity>();

	public Order() {
		super();
	}

	public Order(long order_id, LocalDate date, LocalTime time, String description, float total, LocalTime delivery_time,
			Customer customer, DeliveryRider rider, Set<ItemQuantity> itemQuantity) {
		super();
		this.order_id = order_id;
		this.date = date;
		this.time = time;
		this.description = description;
		Total = total;
		this.delivery_time = delivery_time;
		this.customer = customer;
		this.rider = rider;
		this.itemQuantity = itemQuantity;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public LocalTime getDelivery_time() {
		return delivery_time;
	}

	public void setDelivery_time(LocalTime delivery_time) {
		this.delivery_time = delivery_time;
	}

	public float getTotal() {
		return Total;
	}

	public void setTotal(float total) {
		Total = total;
	}

	public long getOrder_id() {
		return order_id;
	}

	public void setOrder_id(long order_id) {
		this.order_id = order_id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate currentDate) {
		this.date = currentDate;
	}

	public LocalTime getTime() {
		return time;
	}

	public void setTime(LocalTime currentTime) {
		this.time = currentTime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public DeliveryRider getRider() {
		return rider;
	}

	public void setRider(DeliveryRider rider) {
		this.rider = rider;
	}

	public Set<ItemQuantity> getItemQuantity() {
		return itemQuantity;
	}

	public void setItemQuantity(Set<ItemQuantity> itemQuantity) {
		this.itemQuantity = itemQuantity;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

}
