package com.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.model.FoodSupplier;
import com.shop.repositary.FoodSupplierRepo;
import com.shop.service.FoodSupplierService;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v5/")
public class FoodSupplierController {

	@Autowired
	private FoodSupplierRepo foodSupplierRepo;

	@Autowired
	private FoodSupplierService service;
	
	// Add FoodSupplier
		@PostMapping("/FoodSupplierDetails")
		public ResponseEntity<FoodSupplier> addFoodSupplier(@Valid @RequestBody FoodSupplier foodSupplier) {

			FoodSupplier savedFoodSupplier = service.createFoodSupplier(foodSupplier);
			return new ResponseEntity<FoodSupplier>(savedFoodSupplier, HttpStatus.CREATED);
		}
	
}
