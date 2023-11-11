package com.example.demo.model;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "inventory")
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "date")
    private Date date; // or LocalDate date if you prefer

    @Column(name = "productName")
    private String productName;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "price")
    private Double price;

    @Column(name = "shopName")
    private String shopName;

    @Column(name = "mobileNo")
    private String mobileNo;

    @Column(name = "notes")
    private String notes;

    public Inventory() {
    }

    public Inventory(String productName, Long quantity, Double price, String shopName, String mobileNo, String notes, Date date) {
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.shopName = shopName;
        this.mobileNo = mobileNo;
        this.notes = notes;
        this.date = date;
    }

    public Inventory(long id, String productName, Long quantity, Double price, String shopName, String mobileNo, String notes, Date date) {
        this.id = id;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.shopName = shopName;
        this.mobileNo = mobileNo;
        this.notes = notes;
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}