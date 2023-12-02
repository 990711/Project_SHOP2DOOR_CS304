package com.shop.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

@Entity
public class ItemQuantity {

	@EmbeddedId
	private ItemQuantityKey id;
	
	@ManyToOne
	@MapsId("orderId")
	@JoinColumn(name = "order_id")
	private Order order;
	
	@ManyToOne
	@MapsId("itemId")
	@JoinColumn(name = "item_id")
	private Item item;
	
	private int quantity;
	
	

	public ItemQuantity(ItemQuantityKey id, Order order, Item item, int quantity) {
		super();
		this.id = id;
		this.order = order;
		this.item = item;
		this.quantity = quantity;
	}

	public ItemQuantityKey getId() {
		return id;
	}

	public void setId(ItemQuantityKey id) {
		this.id = id;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
