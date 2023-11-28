package com.shop.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.model.Customer;
import com.shop.model.Login;
import com.shop.repositary.CustomerRepo;
import com.shop.repositary.LoginRepo;
import com.shop.service.CustomerService;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CustomerController {

	@Autowired
	private CustomerRepo customerRepo;

	@Autowired
	private CustomerService service;
	
	@Autowired
	private LoginRepo loginRepo;
	
	// Add Customer
		@PostMapping("/CustomerDetails")
		public ResponseEntity<String> addCustomer(@Valid @RequestBody Customer customer) {

			Optional<Login> existingUser = loginRepo.findByUsername(customer.getUsername());
			
			if (existingUser.isPresent()) {
				return ResponseEntity.status(401).body("Please find another username..");
	    	}else {
	    		Customer savedCustomer = service.createCustomer(customer);
	    		return ResponseEntity.ok("Registration successful!");
	    	}
			
			//Customer savedCustomer = service.createCustomer(customer);
			//return new ResponseEntity<Customer>(savedCustomer, HttpStatus.CREATED);
		}
		
		
	
}
