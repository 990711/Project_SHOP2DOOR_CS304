package com.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shop.exception.ResourceNotFound;
import com.shop.model.Customer;
import com.shop.model.Order;
import com.shop.repositary.CustomerRepo;
import com.shop.repositary.DeliveryRiderRepo;
import com.shop.repositary.OrderRepo;

@RestController
@RequestMapping("/api/v1/")
public class OrderController {

	@Autowired
	private OrderRepo repo;

	@Autowired
	private CustomerRepo customerRepo;

	@Autowired
	private DeliveryRiderRepo riderRepo;

	@GetMapping("order")
	public List<Order> getOrders() {
		return repo.findAll();
	}

	@PostMapping("order/{id}")
	public ResponseEntity<Order> createOrder(@PathVariable int id, @RequestBody Order newOrder) {

		Customer thecustomer = customerRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFound("customer not found!" + id));
		Order order = newOrder;
		order.setCustomer(thecustomer);
		order = repo.save(order);
		return new ResponseEntity<Order>(order, HttpStatus.CREATED);
	}

	@PutMapping("orderRider/{order}/{rider}")
	public ResponseEntity<String> addRider(@PathVariable long order, @PathVariable int rider) {

		Order theOrder = repo.findById(order).orElseThrow(() -> new ResourceNotFound("order not found " + order));
		theOrder.setRider(
				riderRepo.findById(rider).orElseThrow(() -> new ResourceNotFound("rider not found " + rider)));
		theOrder = repo.save(theOrder);
		return ResponseEntity.ok("Rider accepted!");
	}

}
