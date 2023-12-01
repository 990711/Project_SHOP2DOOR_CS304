package com.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.model.Customer;
import com.shop.repository.CustomerRepo;

@Service
public class CustomerService {

	@Autowired
	private CustomerRepo repo;

	public Customer createCustomer(Customer newCustomer) {
		return repo.save(newCustomer);
	}
	
}
