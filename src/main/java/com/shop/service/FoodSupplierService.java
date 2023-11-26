package com.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.model.FoodSupplier;
import com.shop.repositary.FoodSupplierRepo;

@Service
public class FoodSupplierService {

	@Autowired
	private FoodSupplierRepo repo;

	public FoodSupplier createFoodSupplier(FoodSupplier newFoodSupplier ) {
		return repo.save(newFoodSupplier );
	}
	
	
}
