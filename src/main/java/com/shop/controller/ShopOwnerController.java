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

import com.shop.model.Item;
import com.shop.model.ShopOwner;
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
	
	// Add Customer
		@PostMapping("/ShopOwnerDetails")
		public ResponseEntity<ShopOwner> addShopOwner(@Valid @RequestBody ShopOwner shopOwner) {

			ShopOwner savedShopOwner = service.createShopOwner(shopOwner);
			return new ResponseEntity<ShopOwner>(savedShopOwner, HttpStatus.CREATED);
		}
		
		@GetMapping("/ShopOwner")
	    public List<ShopOwner> getAllShops() {
	        return shopOwnerRepo.findAll();
	    }
	
}
