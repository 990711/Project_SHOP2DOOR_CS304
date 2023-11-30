package com.shop.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.exception.ResourceNotFound;
import com.shop.model.Item;
import com.shop.model.ShopOwner;
import com.shop.repositary.ItemRepo;
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
	
	// Add Customer
		@PostMapping("/ShopOwnerDetails")
		public ResponseEntity<ShopOwner> addShopOwner(@Valid @RequestBody ShopOwner shopOwner) {

			ShopOwner savedShopOwner = service.createShopOwner(shopOwner);
			return new ResponseEntity<ShopOwner>(savedShopOwner, HttpStatus.CREATED);
		}
		
	@GetMapping("/ShopOwner")
    public List<Map<String, Object>> getAllShops() {
       return shopOwnerRepo.getAllShops();
   }
		
//		@GetMapping("/ShopOwner")
//	    public List<ShopOwner> getAllShops() {
//	        return shopOwnerRepo.findAll();
//	    }
		
	
		@PutMapping("/ShopOwner/{id}")
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
	
}
