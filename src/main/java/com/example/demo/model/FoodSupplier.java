package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "food_Supplier")

public class FoodSupplier{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;
    @Column(name = "Password")
    private String password;
    @Column(name = "mobileNo")
    private String mobileNo;
    @Column(name = "address")
    private String address;
    @Column(name = "email")
    private String email;

    public FoodSupplier() {
    }

    public FoodSupplier(String name) {
        this.name = name;
    }

    public FoodSupplier(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public FoodSupplier(long id, String name, String mobileNo) {
        this.id = id;
        this.name = name;
        this.mobileNo = mobileNo;
    }

    public FoodSupplier(String name, String mobileNo, String address, String email) {
        this.name = name;
        this.mobileNo = mobileNo;
        this.address = address;
        this.email = email;
    }

    public FoodSupplier(String name, String password, String mobileNo, String address, String email) {
        this.name = name;
        this.password = password;
        this.mobileNo = mobileNo;
        this.address = address;
        this.email = email;
    }

    public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
