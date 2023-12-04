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
import com.shop.model.Login;
import com.shop.model.Restaurant;
import com.shop.repositary.LoginRepo;
import com.shop.repositary.RestaurantRepo;
import com.shop.service.RestaurantService;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class RestaurantController {

	@Autowired
	private RestaurantRepo restaurantRepo;

	@Autowired
	private RestaurantService service;
	
	@Autowired
	private LoginRepo loginRepo;
	
		/*@PostMapping("/RestaurantDetails")
		public ResponseEntity<Restaurant> addRestaurant(@Valid @RequestBody Restaurant restaurant) {

			Restaurant savedRestaurant = service.createRestaurant(restaurant);
			return new ResponseEntity<Restaurant>(savedRestaurant, HttpStatus.CREATED);
		}*/
		
		// Add Restaurant
				@PostMapping("/RestaurantDetails")
				public ResponseEntity<String> addRestaurant(@Valid @RequestBody Restaurant restaurant) {

					Optional<Login> existingUser = loginRepo.findByUsername(restaurant.getUsername());
					
					if (existingUser.isPresent()) {
						return ResponseEntity.status(401).body("Please find another username..");
			    	}else {
			    		Restaurant savedRestaurant = service.createRestaurant(restaurant);
			    		return ResponseEntity.ok("Registration successful!");
			    	}
					
					//Customer savedCustomer = service.createCustomer(customer);
					//return new ResponseEntity<Customer>(savedCustomer, HttpStatus.CREATED);
		}
				
		
		@GetMapping("/RestaurantDetails")
		public List<Restaurant> getRestaurants() {
			return restaurantRepo.findAll();
		}
				
		@GetMapping("/RestaurantDetails/{username}")
		public ResponseEntity<Restaurant> getRestaurantByUsername(@PathVariable String username) {
			Restaurant restaurant = restaurantRepo.findByUsername(username)
			                .orElseThrow(() -> new ResourceNotFound("Restaurant not found with username: " + username));
			return ResponseEntity.ok(restaurant);
		}
				
		@PutMapping("/RestaurantDetails/{username}")
	    public ResponseEntity<Restaurant> updateRestaurantByUsername(@PathVariable String username,@Valid @RequestBody Restaurant newRestaurant) {
			Restaurant restaurant = restaurantRepo.findByUsername(username)
	                .orElseThrow(() -> new ResourceNotFound("Restaurant not found with username: " + username));
			
	    	restaurant.setContact(newRestaurant.getContact());
	    	restaurant.setEmail(newRestaurant.getEmail());
	    	restaurant.setLocation(newRestaurant.getLocation());
	    	restaurant.setName(newRestaurant.getName());
	        
	    	Restaurant updatedRestaurant = restaurantRepo.save(restaurant);
	        return ResponseEntity.ok(updatedRestaurant);
	    }
		
		@DeleteMapping("/RestaurantDetails/{username}")
		public ResponseEntity<String> deleteRestaurant(@PathVariable String username){
			Restaurant restaurant = restaurantRepo.findByUsername(username)
	                .orElseThrow(() -> new ResourceNotFound("Restaurant not found with username: " + username));
			
			restaurant.setDeleted(true);
			restaurantRepo.save(restaurant);
			String msg = "Restaurant successfully deleted!";
			return ResponseEntity.ok(msg);
		}
			
	
	
}
