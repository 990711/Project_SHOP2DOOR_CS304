package com.shop.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.exception.ResourceNotFound;
import com.shop.model.Customer;
import com.shop.model.FoodSupplier;
import com.shop.model.Login;
import com.shop.repositary.FoodSupplierRepo;
import com.shop.repositary.LoginRepo;
import com.shop.service.FoodSupplierService;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class FoodSupplierController {

	@Autowired
	private FoodSupplierRepo foodSupplierRepo;

	@Autowired
	private FoodSupplierService service;
	

	@Autowired
	private LoginRepo loginRepo;
	
	// Add FoodSupplier
//		@PostMapping("/FoodSupplierDetails")
//		public ResponseEntity<FoodSupplier> addFoodSupplier(@Valid @RequestBody FoodSupplier foodSupplier) {
//
//			FoodSupplier savedFoodSupplier = service.createFoodSupplier(foodSupplier);
//			return new ResponseEntity<FoodSupplier>(savedFoodSupplier, HttpStatus.CREATED);
//		}
	
	@PostMapping("/FoodSupplierDetails")
	public ResponseEntity<String> addFoodSupplier(@Valid @RequestBody FoodSupplier foodSupplier) {

		Optional<Login> existingUser = loginRepo.findByUsername(foodSupplier.getUsername());
		//Optional<Customer> existingUser = customerRepo.findByUsername(customer.getUsername());
		
		if (existingUser.isPresent()) {
			return ResponseEntity.status(401).body("Please find another username..");
    	}else {
    		FoodSupplier savedFoodSupplier = service.createFoodSupplier(foodSupplier);
    		return ResponseEntity.ok("Registration successful!");
    	}
		
		//Customer savedCustomer = service.createCustomer(customer);
		//return new ResponseEntity<Customer>(savedCustomer, HttpStatus.CREATED);
	}
	
	@GetMapping("/FoodSupplierDetails")
	public List<FoodSupplier> getFoodSuppliers() {
		return foodSupplierRepo.findAll();
	}
	
	@GetMapping("/FoodSupplierDetails/{username}")
    public ResponseEntity<FoodSupplier> getFoodSupplierByUsername(@PathVariable String username) {
		FoodSupplier foodSupplier = foodSupplierRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFound("FoodSupplier not found with username: " + username));
        return ResponseEntity.ok(foodSupplier);
 }
	
	@PutMapping("/FoodSupplierDetails/{username}")
    public ResponseEntity<FoodSupplier> updateFoodSupplierByUsername(@PathVariable String username, @RequestBody FoodSupplier newFoodSupplier) {
		FoodSupplier foodSupplier = foodSupplierRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFound("FoodSupplier not found with username: " + username));
        
    	foodSupplier.setAddress(newFoodSupplier.getAddress());
    	foodSupplier.setContact(newFoodSupplier.getContact());
    	foodSupplier.setEmail(newFoodSupplier.getEmail());
    	foodSupplier.setName(newFoodSupplier.getName());
        
    	FoodSupplier updatedFoodSupplier = foodSupplierRepo.save(foodSupplier);
        return ResponseEntity.ok(updatedFoodSupplier);
    }
	
	@DeleteMapping("/FoodSupplierDetails/{username}")
	public ResponseEntity<String> deleteFoodSupplier(@PathVariable String username){
		FoodSupplier foodSupplier = foodSupplierRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFound("FoodSupplier not found with username: " + username));
        
		foodSupplier.setDeleted(true);
		foodSupplierRepo.save(foodSupplier);
		String msg = "Food supplier successfully deleted!";
		return ResponseEntity.ok(msg);
	}
	
		
		
	
}
