package com.shop.controller;

import java.util.List;
import java.util.Map;
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
import com.shop.model.Item;
import com.shop.model.Login;
import com.shop.model.ShopOwner;
import com.shop.model.ShopOwnerJob;
import com.shop.repositary.ItemRepo;
import com.shop.repositary.LoginRepo;
import com.shop.repositary.ShopOwnerJobRepo;
import com.shop.repositary.ShopOwnerRepo;
import com.shop.service.ShopOwnerService;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ShopOwnerController {

	@Autowired
	private ShopOwnerRepo shopOwnerRepo;

	@Autowired
	private ShopOwnerService service;
	
	@Autowired
    private ItemRepo itemRepo;
	
	@Autowired
    private ShopOwnerJobRepo shopOwnerJobRepo;
	
	@Autowired
	private LoginRepo loginRepo;
	
	// Add ShopOwner
//		@PostMapping("/ShopOwner")
//		public ResponseEntity<ShopOwner> addShopOwner(@Valid @RequestBody ShopOwner shopOwner) {
//
//			ShopOwner savedShopOwner = service.createShopOwner(shopOwner);
//			return new ResponseEntity<ShopOwner>(savedShopOwner, HttpStatus.CREATED);
//		}
		
		@PostMapping("/ShopOwner")
		public ResponseEntity<String> addShopOwner(@Valid @RequestBody ShopOwner shopOwner) {

			Optional<Login> existingUser = loginRepo.findByUsername(shopOwner.getUsername());
			//Optional<ShopOwner> existingUser = shopOwnerRepo.findByUsername(shopOwner.getUsername());
			
			if (existingUser.isPresent()) {
				return ResponseEntity.status(401).body("Please find another username..");
	    	}else {
	    		ShopOwner savedShop = service.createShopOwner(shopOwner);
	    		return ResponseEntity.ok("Registration successful!");
	    	}
			
			//Customer savedCustomer = service.createCustomer(customer);
			//return new ResponseEntity<Customer>(savedCustomer, HttpStatus.CREATED);
		}
		
	@GetMapping("/ShopOwner")
    public List<Map<String, Object>> getAllShops() {
       return shopOwnerRepo.getAllShops();
   }
		
//		@GetMapping("/ShopOwner")
//	    public List<ShopOwner> getAllShops() {
//	        return shopOwnerRepo.findAll();
//	    }
		
	
		@PutMapping("/ShopOwnerItem/{id}")
		public ResponseEntity<String> updateItemList(@PathVariable Long id, @RequestBody Item newItem){
			ShopOwner shop = shopOwnerRepo.findById(id)
	                .orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));
			
			//Item item = new Item()
			
			shop.getItems().add(newItem);
			
			newItem.setShopOwner(shop);
			
			//ShopOwner updatedShop = shopOwnerRepo.save(shop);
			
			
			itemRepo.save(newItem);
			shopOwnerRepo.save(shop);
			
			return ResponseEntity.ok("Successfully added item..");
		}
	
		@PutMapping("/ShopOwnerJob/{id}")
		public ResponseEntity<String> updateJobs(@PathVariable Long id, @RequestBody ShopOwnerJob newJob){
			ShopOwner shop = shopOwnerRepo.findById(id)
	                .orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));
			
			//Item item = new Item()
			
			shop.getJobs().add(newJob);
			
			newJob.setShop(shop);
			
			//ShopOwner updatedShop = shopOwnerRepo.save(shop);
			
			
			shopOwnerJobRepo.save(newJob);
			shopOwnerRepo.save(shop);
			
			return ResponseEntity.ok("Successfully added item..");
		}
		
		@GetMapping("/ShopOwner/{username}")
	    public ResponseEntity<ShopOwner> getShopByUsername(@PathVariable String username) {
	    	ShopOwner shop = shopOwnerRepo.findByUsername(username)
	                .orElseThrow(() -> new ResourceNotFound("Shop Owner not found with username: " + username));
	        return ResponseEntity.ok(shop);
	 }
		
		@PutMapping("/ShopOwner/{username}")
	    public ResponseEntity<ShopOwner> updateShopOwnerByUsername(@PathVariable String username, @RequestBody ShopOwner newShop) {
			ShopOwner shop = shopOwnerRepo.findByUsername(username)
	                .orElseThrow(() -> new ResourceNotFound("Customer not found with username: " + username));
	        
	    	shop.setBranch(newShop.getBranch());
	    	shop.setContact(newShop.getContact());
	    	shop.setEmail(newShop.getEmail());
	    	shop.setLocation(newShop.getLocation());
	    	shop.setShop_name(newShop.getShop_name());
	        
	    	ShopOwner updatedShop = shopOwnerRepo.save(shop);
	        return ResponseEntity.ok(updatedShop);
	    }
		
		@DeleteMapping("/ShopOwner/{username}")
		public ResponseEntity<String> deleteShopOwner(@PathVariable String username){
			ShopOwner shop = shopOwnerRepo.findByUsername(username)
	                .orElseThrow(() -> new ResourceNotFound("Customer not found with username: " + username));
	        
			shop.setDeleted(true);
			shopOwnerRepo.save(shop);
			String msg = "Shop Owner successfully deleted!";
			return ResponseEntity.ok(msg);
		}
	
}
