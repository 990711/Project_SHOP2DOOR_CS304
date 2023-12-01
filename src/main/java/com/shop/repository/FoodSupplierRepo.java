package com.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.model.FoodSupplier;

@Repository
public interface FoodSupplierRepo extends JpaRepository<FoodSupplier, Integer>{

	
	
}
