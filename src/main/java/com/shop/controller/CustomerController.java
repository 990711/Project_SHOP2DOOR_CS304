package com.shop.controller;

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
import com.shop.service.CustomerService;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v3/")
public class CustomerController {

	@Autowired
	private CustomerRepo customerRepo;

	@Autowired
	private CustomerService service;
	
	// Add Customer
		@PostMapping("/CustomerDetails")
		public ResponseEntity<Customer> addCustomer(@Valid @RequestBody Customer customer) {

			Customer savedCustomer = service.createCustomer(customer);
			return new ResponseEntity<Customer>(savedCustomer, HttpStatus.CREATED);
		}
	
}
