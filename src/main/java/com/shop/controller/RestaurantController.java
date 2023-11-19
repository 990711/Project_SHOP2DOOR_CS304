package com.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.model.Restaurant;
import com.shop.repositary.RestaurantRepo;
import com.shop.service.RestaurantService;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v7/")
public class RestaurantController {

	@Autowired
	private RestaurantRepo restaurantRepo;

	@Autowired
	private RestaurantService service;
	
	// Add Restaurant
		@PostMapping("/RestaurantDetails")
		public ResponseEntity<Restaurant> addRestaurant(@Valid @RequestBody Restaurant restaurant) {

			Restaurant savedRestaurant = service.createRestaurant(restaurant);
			return new ResponseEntity<Restaurant>(savedRestaurant, HttpStatus.CREATED);
		}
	
	
}
