package com.shop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "Item")
public class Item {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long item_id;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "name")
	private String name;
	
	//@NotBlank(message = "this column must be filled!")
	@Column(name = "price")
	private float price;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "brand")
	private String brand;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "discount percentage")
	private float discount_percentage;
	
	//@NotBlank(message = "this column must be filled!")
	@Column(name = "quantity")
	private int quantity;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "image")
	private String image;
	
	@NotBlank(message = "this column must be filled!")
	@Column(name = "category")
	private String category;
	
	
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Item() {
		
	}

	

	public Item(@NotBlank(message = "this column must be filled!") String name, float price,
			@NotBlank(message = "this column must be filled!") String brand, String description,
			float discount_percentage, int quantity, @NotBlank(message = "this column must be filled!") String image,
			@NotBlank(message = "this column must be filled!") String category) {
		super();
		this.name = name;
		this.price = price;
		this.brand = brand;
		this.description = description;
		this.discount_percentage = discount_percentage;
		this.quantity = quantity;
		this.image = image;
		this.category = category;
	}

	public Long getItem_id() {
		return item_id;
	}

	public void setItem_id(Long item_id) {
		this.item_id = item_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public float getDiscount_percentage() {
		return discount_percentage;
	}

	public void setDiscount_percentage(float discount_percentage) {
		this.discount_percentage = discount_percentage;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	
	
}
