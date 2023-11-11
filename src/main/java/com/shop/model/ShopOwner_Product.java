package com.shop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "shopowner_products")

public class ShopOwner_Product {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;
    
    
    @Column(name = "filePath")
    private String filePath;
    

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "discount_price")
    private Double discountPrice;

    @Column(name = "discount_percentage")
    private Double discountPercentage;

    

    public ShopOwner_Product() {
    }

    public ShopOwner_Product(String name, String filePath, String description, Double price, Long quantity, Double discountPrice, Double discountPercentage) {
        this.name = name;
        this.filePath = filePath;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.discountPrice = discountPrice;
        this.discountPercentage = discountPercentage;
        
    }
    
    public long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

 // Getter and Setter for 'description'
 public String getDescription() {
     return description;
 }

 public void setDescription(String description) {
     this.description = description;
 }

 // Getter and Setter for 'price'
 public Double getPrice() {
     return price;
 }

 public void setPrice(Double price) {
     this.price = price;
 }

 // Getter and Setter for 'quantity'
 public Long getQuantity() {
     return quantity;
 }

 public void setQuantity(Long quantity) {
     this.quantity = quantity;
 }

 // Getter and Setter for 'discountPrice'
 public Double getDiscountPrice() {
     return discountPrice;
 }

 public void setDiscountPrice(Double discountPrice) {
     this.discountPrice = discountPrice;
 }

 // Getter and Setter for 'discountPercentage'
 public Double getDiscountPercentage() {
     return discountPercentage;
 }

 public void setDiscountPercentage(Double discountPercentage) {
     this.discountPercentage = discountPercentage;
 }

}

