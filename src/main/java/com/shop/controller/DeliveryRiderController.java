package com.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.model.DeliveryRider;
import com.shop.repository.DeliveryRiderRepo;
import com.shop.service.DeliveryRiderService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/v1/")
public class DeliveryRiderController {

	@Autowired
	private DeliveryRiderRepo deliveryRiderRepo;

	@Autowired
	private DeliveryRiderService service;
	
	// Add Customer
		@PostMapping("/DeliveryRiderDetails")
		public ResponseEntity<DeliveryRider> addDeliveryRider(@Valid @RequestBody DeliveryRider deliveryRider) {

			DeliveryRider savedDeliveryRider = service.createDeliveryRider(deliveryRider);
			return new ResponseEntity<DeliveryRider>(savedDeliveryRider, HttpStatus.CREATED);
		}
	
}
