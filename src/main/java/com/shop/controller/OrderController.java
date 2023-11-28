package com.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.model.Order;
import com.shop.repositary.OrderRepo;

@RestController
@RequestMapping("/api/v1/")
public class OrderController {

	@Autowired
	private OrderRepo repo;

	@GetMapping("order")
	public List<Order> getOrders() {
		return repo.findAll();
	}

	@PostMapping("order")
	public ResponseEntity<Order> createOrder(@RequestBody Order newOrder) {

		Order order = repo.save(newOrder);
		return new ResponseEntity<Order>(order, HttpStatus.CREATED);
	}

}
