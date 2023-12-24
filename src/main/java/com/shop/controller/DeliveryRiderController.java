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
import com.shop.model.DeliveryRider;
import com.shop.model.Login;
import com.shop.model.Order;
import com.shop.repositary.DeliveryRiderRepo;
import com.shop.repositary.LoginRepo;
import com.shop.service.DeliveryRiderService;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class DeliveryRiderController {

	@Autowired
	private DeliveryRiderRepo deliveryRiderRepo;

	@Autowired
	private DeliveryRiderService service;
	
	@Autowired
	private LoginRepo loginRepo;
	
	
//		@PostMapping("/DeliveryRiderDetails")
//		public ResponseEntity<DeliveryRider> addDeliveryRider(@Valid @RequestBody DeliveryRider deliveryRider) {
//
//			DeliveryRider savedDeliveryRider = service.createDeliveryRider(deliveryRider);
//			return new ResponseEntity<DeliveryRider>(savedDeliveryRider, HttpStatus.CREATED);
//		}
	
		@GetMapping("/DeliveryRiderDetails")
		public List<DeliveryRider> getRiders() {
			return deliveryRiderRepo.findAll();
		}
		
		@PostMapping("/DeliveryRiderDetails")
		public ResponseEntity<String> addDeliveryRider(@Valid @RequestBody DeliveryRider rider) {

			Optional<Login> existingUser = loginRepo.findByUsername(rider.getUsername());
			//Optional<DeliveryRider> existingUser = deliveryRiderRepo.findByUsername(rider.getUsername());
			
			if (existingUser.isPresent()) {
				return ResponseEntity.status(401).body("Please find another username..");
	    	}else {
	    		DeliveryRider savedRider = service.createDeliveryRider(rider);
	    		return ResponseEntity.ok("Registration successful!");
	    	}
			
			//Customer savedCustomer = service.createCustomer(customer);
			//return new ResponseEntity<Customer>(savedCustomer, HttpStatus.CREATED);
		}
		
		@GetMapping("/DeliveryRiderDetails/{username}")
	    public ResponseEntity<DeliveryRider> getDeliveryRiderByUsername(@PathVariable String username) {
			DeliveryRider rider = deliveryRiderRepo.findByUsername(username)
	                .orElseThrow(() -> new ResourceNotFound("DeliveryRider not found with username: " + username));
	        return ResponseEntity.ok(rider);
	 }
		
		@PutMapping("/DeliveryRiderDetails/{username}")
	    public ResponseEntity<DeliveryRider> updateDeliveryRiderByUsername(@PathVariable String username, @RequestBody DeliveryRider newRider) {
			DeliveryRider rider = deliveryRiderRepo.findByUsername(username)
	                .orElseThrow(() -> new ResourceNotFound("DeliveryRider not found with username: " + username));
	        
	    	rider.setArea_of_pref(newRider.getArea_of_pref());
	    	rider.setContact(newRider.getContact());
	    	rider.setEmail(newRider.getEmail());
	    	rider.setLicense(newRider.getLicense());
	    	rider.setName(newRider.getName());
	    	rider.setVehicle_no(newRider.getVehicle_no());
	    	rider.setVehicle_type(newRider.getVehicle_type());
	        
	    	DeliveryRider updatedDeliveryRider = deliveryRiderRepo.save(rider);
	        return ResponseEntity.ok(updatedDeliveryRider);
	    }
		
		@DeleteMapping("/DeliveryRiderDetails/{username}")
		public ResponseEntity<String> deleteDeliveryRider(@PathVariable String username){
			DeliveryRider rider = deliveryRiderRepo.findByUsername(username)
	                .orElseThrow(() -> new ResourceNotFound("DeliveryRider not found with username: " + username));
	        
			rider.setDeleted(true);
			deliveryRiderRepo.save(rider);
			String msg = "Delivery Rider successfully deleted!";
			return ResponseEntity.ok(msg);
		}
		
		@GetMapping("deliveryriderorders/{username}")
		public List<Order> getOrders(@PathVariable String username) {
			DeliveryRider rider =  deliveryRiderRepo.findByUsername(username).orElseThrow(() -> new ResourceNotFound(username + "not found!"));
			return rider.getOrders();
		}
}
