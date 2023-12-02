package com.shop.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class ItemQuantityKey implements Serializable {

	@Column(name = "order_id")
	private long orderId;

	@Column(name = "item_id")
	private long itemId;

	public ItemQuantityKey(long orderId, long itemId) {
		super();
		this.orderId = orderId;
		this.itemId = itemId;
	}

	public long getOrderId() {
		return orderId;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}

	public long getItemId() {
		return itemId;
	}

	public void setItemId(long itemId) {
		this.itemId = itemId;
	}

}
