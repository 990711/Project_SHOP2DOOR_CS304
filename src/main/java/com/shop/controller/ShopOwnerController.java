package com.shop.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

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
import com.shop.model.Item;
import com.shop.model.Login;
import com.shop.model.ShopOwner;
import com.shop.model.ShopOwnerJob;
import com.shop.repositary.ItemQuantityRepo;
import com.shop.repositary.ItemRepo;
import com.shop.repositary.LoginRepo;
import com.shop.repositary.ShopOwnerJobRepo;
import com.shop.repositary.ShopOwnerRepo;
import com.shop.service.ShopOwnerService;
import com.twilio.http.Response;

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

	@Autowired
	private ItemQuantityRepo itemQuantityRepo;
	
	@Autowired
	ItemController item;

	// Add ShopOwner
//		@PostMapping("/ShopOwner")
//		public ResponseEntity<ShopOwner> addShopOwner(@Valid @RequestBody ShopOwner shopOwner) {
//
//			ShopOwner savedShopOwner = service.createShopOwner(shopOwner);
//			return new ResponseEntity<ShopOwner>(savedShopOwner, HttpStatus.CREATED);
//		}

	@PostMapping("/ShopOwnerDetails")
	public ResponseEntity<String> addShopOwner(@Valid @RequestBody ShopOwner shopOwner) {

		Optional<Login> existingUser = loginRepo.findByUsername(shopOwner.getUsername());
		// Optional<ShopOwner> existingUser =
		// shopOwnerRepo.findByUsername(shopOwner.getUsername());

		if (existingUser.isPresent()) {
			return ResponseEntity.status(401).body("Please find another username..");
		} else {
			ShopOwner savedShop = service.createShopOwner(shopOwner);
			return ResponseEntity.ok("Registration successful!");
		}

		// Customer savedCustomer = service.createCustomer(customer);
		// return new ResponseEntity<Customer>(savedCustomer, HttpStatus.CREATED);
	}

	@GetMapping("/ShopOwnerDetails")
	public List<Map<String, Object>> getAllShops() {
		return shopOwnerRepo.getAllShops();
	}

//		@GetMapping("/ShopOwner")
//	    public List<ShopOwner> getAllShops() {
//	        return shopOwnerRepo.findAll();
//	    }

	/*@PutMapping("/ShopOwnerItem/{id}")
	public ResponseEntity<String> updateItemList(@PathVariable int id, @RequestBody Item newItem) {
		ShopOwner shop = shopOwnerRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));

		// Item item = new Item()

		shop.getItems().add(newItem);

		newItem.setShopOwner(shop);

		// ShopOwner updatedShop = shopOwnerRepo.save(shop);

		itemRepo.save(newItem);
		shopOwnerRepo.save(shop);

		return ResponseEntity.ok("Successfully added item..");
	}*/
	
	@PutMapping("/ShopOwnerItem/{username}")
	public ResponseEntity<String> updateItemList(@PathVariable String username, @RequestBody Item newItem){
		ShopOwner shop = shopOwnerRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFound("Shop Owner not found with username: " + username));
		
		//Item item = new Item()
		
		shop.getItems().add(newItem);
		
		newItem.setShopOwner(shop);
		
		//ShopOwner updatedShop = shopOwnerRepo.save(shop);
		
		
		itemRepo.save(newItem);
		shopOwnerRepo.save(shop);
		
		return ResponseEntity.ok("Successfully added item..");
	}

	/*@PutMapping("/ShopOwnerJob/{id}")
	public ResponseEntity<String> updateJobs(@PathVariable int id, @RequestBody ShopOwnerJob newJob) {
		ShopOwner shop = shopOwnerRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));

		// Item item = new Item()
		newJob.setApplicationStatus("open");

		shop.getJobs().add(newJob);

		newJob.setShop(shop);

		// ShopOwner updatedShop = shopOwnerRepo.save(shop);

		shopOwnerJobRepo.save(newJob);
		shopOwnerRepo.save(shop);

		return ResponseEntity.ok("Successfully Posted the job.");
	}*/
	
	@PutMapping("/ShopOwnerJob/{username}")
	public ResponseEntity<String> updateJobs(@PathVariable String username, @RequestBody ShopOwnerJob newJob){
		ShopOwner shop = shopOwnerRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFound("Shop Owner not found with username: " + username));
		
		//Item item = new Item()
		
		shop.getJobs().add(newJob);
		
		newJob.setShop(shop);
		
		//ShopOwner updatedShop = shopOwnerRepo.save(shop);
		
		
		shopOwnerJobRepo.save(newJob);
		shopOwnerRepo.save(shop);
		
		return ResponseEntity.ok("Successfully added item..");
	}
	
	

	// close a particular job belongs to a shop owner
	@PutMapping("ShopOwnerclosejob/{id}")
	public ResponseEntity<String> closeAJob(@PathVariable long id) {

		
		ShopOwnerJob job = shopOwnerJobRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFound(id + " job is not found!"));
		job.setApplicationStatus("close");
		shopOwnerJobRepo.save(job);
		return ResponseEntity.ok("closed the job");
	}
	
	// reopen a particular job belongs to a shop owner
		@PutMapping("ShopOwneropenjob/{id}")
		public ResponseEntity<String> reOpenAJob(@PathVariable long id) {

			
			ShopOwnerJob job = shopOwnerJobRepo.findById(id)
					.orElseThrow(() -> new ResourceNotFound(id + " job is not found!"));
			job.setApplicationStatus("open");
			shopOwnerJobRepo.save(job);
			return ResponseEntity.ok("reopened the job");
		}

	@GetMapping("/ShopOwnerDetails/{username}")
	public ResponseEntity<ShopOwner> getShopByUsername(@PathVariable String username) {
		ShopOwner shop = shopOwnerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFound("Shop Owner not found with username: " + username));
		return ResponseEntity.ok(shop);
	}

	@PutMapping("/ShopOwnerDetails/{username}")
	public ResponseEntity<ShopOwner> updateShopOwnerByUsername(@PathVariable String username,
			@RequestBody ShopOwner newShop) {
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

	@DeleteMapping("/ShopOwnerDetails/{username}")
	public ResponseEntity<String> deleteShopOwner(@PathVariable String username) {
		ShopOwner shop = shopOwnerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFound("Customer not found with username: " + username));

		shop.setDeleted(true);
		shopOwnerRepo.save(shop);
		String msg = "Shop Owner successfully deleted!";
		return ResponseEntity.ok(msg);
	}

	// provide all the orders which are belongs to a particular shop owner
	@GetMapping("ShopOwnerOrderDetails/{shopId}")
	public ResponseEntity<List<Map<String, Object>>> shopOwnerOrderDetails(@PathVariable int shopId) {
		List<Map<String, Object>> items = itemQuantityRepo.findItemsByShopOwnerID(shopId);
		return new ResponseEntity<List<Map<String, Object>>>(items, HttpStatus.OK);
	}
	
	@GetMapping("getPendingOrders/{username}")
	public ResponseEntity<List<Long>> getPendingOrders(@PathVariable String username){
		ShopOwner shop = shopOwnerRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFound("Shop Owner not found with username: " + username));
		
		List<Long> orderList = shopOwnerRepo.getPendingOrders(shop.getUser_id());
		return ResponseEntity.ok(orderList);
	}
	
	/*@GetMapping("getPendingOrderItems/{username}/{orderId}")
	public ResponseEntity<List<Map<String, Object>>> getPendingOrderItems(@PathVariable String username,@PathVariable Long orderId){
		float totalBill = 0;
		
		ShopOwner shop = shopOwnerRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFound("Shop Owner not found with username: " + username));
		
		List<Map<String, Object>> itemList = shopOwnerRepo.getPendingOrdersItems(shop.getUser_id(),orderId);
		return ResponseEntity.ok(itemList);
	}*/
	
	/*@GetMapping("getPendingOrderItems/{username}/{orderId}")
	public ResponseEntity<Map<String, Object>> getPendingOrderItems(@PathVariable String username, @PathVariable Long orderId) {
	    float totalBill = 0;

	    ShopOwner shop = shopOwnerRepo.findByUsername(username)
	            .orElseThrow(() -> new ResourceNotFound("Shop Owner not found with username: " + username));

	    List<Map<String, Object>> itemList = shopOwnerRepo.getPendingOrdersItems(shop.getUser_id(), orderId);

	    // Calculate totalBill
	    for (Map<String, Object> itemMap : itemList) {
	    	// Accessing values using keys
	    				Object itemId = itemMap.get("item_id");
	    				Object quantity = itemMap.get("quantity");

	    				float item_price = item.findItemPriceByItemID(Long.parseLong(itemId.toString()));

	    				float item_price_total = item_price * Integer.parseInt(quantity.toString());

	    				totalBill += item_price_total;
	    }

	    // Create the custom response object
	    Map<String, Object> response = new HashMap<>();
	    response.put("itemList", itemList);
	    response.put("totalBill", totalBill);

	    return ResponseEntity.ok(response);
	}*/
	
	@GetMapping("getPendingOrderItems/{username}/{orderId}")
	public ResponseEntity<Map<String, Object>> getPendingOrderItems(@PathVariable String username, @PathVariable Long orderId) {
	    float totalBill = 0;

	    ShopOwner shop = shopOwnerRepo.findByUsername(username)
	            .orElseThrow(() -> new ResourceNotFound("Shop Owner not found with username: " + username));

	    List<Map<String, Object>> itemList = shopOwnerRepo.getPendingOrdersItems(shop.getUser_id(), orderId);

	    // Calculate totalBill and include item price in the response
	    List<Map<String, Object>> modifiedItemList = new ArrayList<>();
	    for (Map<String, Object> itemMap : itemList) {
	        Object itemId = itemMap.get("item_id");
	        Object quantity = itemMap.get("quantity");

	        // Assuming item_price is retrieved from the item service based on the itemId
	        float itemPrice = item.findItemPriceByItemID(Long.parseLong(itemId.toString()));

	        float itemPriceTotal = itemPrice * Integer.parseInt(quantity.toString());

	        totalBill += itemPriceTotal;

	        // Create a new map with the original values and add the item price
	        Map<String, Object> modifiedItemMap = new HashMap<>(itemMap);
	        
	        Item item = itemRepo.findById(Long.parseLong(itemId.toString()))
	                .orElseThrow(() -> new ResourceNotFound("Item not found with id: " + Long.parseLong(itemId.toString())));
	        
	        modifiedItemMap.put("item_name", item.getName());
	        modifiedItemMap.put("item_brand", item.getBrand());
	        modifiedItemMap.put("item_category", item.getCategory());
	        modifiedItemMap.put("item_price", itemPrice);
	        modifiedItemMap.put("item_description", item.getDescription());

	        modifiedItemList.add(modifiedItemMap);
	    }

	    // Create the custom response object
	    Map<String, Object> response = new HashMap<>();
	    response.put("itemList", modifiedItemList);
	    response.put("totalBill", totalBill);

	    return ResponseEntity.ok(response);
	}
	
	@GetMapping("getCompletedOrders/{username}")
	public ResponseEntity<List<Long>> getCompletedOrders(@PathVariable String username){
		ShopOwner shop = shopOwnerRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFound("Shop Owner not found with username: " + username));
		
		List<Long> orderList = shopOwnerRepo.getCompletedOrders(shop.getUser_id());
		return ResponseEntity.ok(orderList);
	}
	
	/*@GetMapping("getCompletedOrderItems/{username}/{orderId}")
	public ResponseEntity<Map<String, Object>> getCompletedOrderItems(@PathVariable String username, @PathVariable Long orderId) {
	    float totalBill = 0;

	    ShopOwner shop = shopOwnerRepo.findByUsername(username)
	            .orElseThrow(() -> new ResourceNotFound("Shop Owner not found with username: " + username));

	    List<Map<String, Object>> itemList = shopOwnerRepo.getCompletedOrdersItems(shop.getUser_id(), orderId);

	    // Calculate totalBill
	    for (Map<String, Object> itemMap : itemList) {
	    	// Accessing values using keys
	    				Object itemId = itemMap.get("item_id");
	    				Object quantity = itemMap.get("quantity");

	    				float item_price = item.findItemPriceByItemID(Long.parseLong(itemId.toString()));

	    				float item_price_total = item_price * Integer.parseInt(quantity.toString());

	    				totalBill += item_price_total;
	    }

	    // Create the custom response object
	    Map<String, Object> response = new HashMap<>();
	    response.put("itemList", itemList);
	    response.put("totalBill", totalBill);

	    return ResponseEntity.ok(response);
	}*/
	
	@GetMapping("getCompletedOrderItems/{username}/{orderId}")
	public ResponseEntity<Map<String, Object>> getCompletedOrderItems(@PathVariable String username, @PathVariable Long orderId) {
	    float totalBill = 0;

	    ShopOwner shop = shopOwnerRepo.findByUsername(username)
	            .orElseThrow(() -> new ResourceNotFound("Shop Owner not found with username: " + username));

	    List<Map<String, Object>> itemList = shopOwnerRepo.getCompletedOrdersItems(shop.getUser_id(), orderId);

	    // Calculate totalBill and include item price in the response
	    List<Map<String, Object>> modifiedItemList = new ArrayList<>();
	    for (Map<String, Object> itemMap : itemList) {
	        Object itemId = itemMap.get("item_id");
	        Object quantity = itemMap.get("quantity");

	        // Assuming item_price is retrieved from the item service based on the itemId
	        float itemPrice = item.findItemPriceByItemID(Long.parseLong(itemId.toString()));

	        float itemPriceTotal = itemPrice * Integer.parseInt(quantity.toString());

	        totalBill += itemPriceTotal;

	        // Create a new map with the original values and add the item price
	        Map<String, Object> modifiedItemMap = new HashMap<>(itemMap);
	        
	        Item item = itemRepo.findById(Long.parseLong(itemId.toString()))
	                .orElseThrow(() -> new ResourceNotFound("Item not found with id: " + Long.parseLong(itemId.toString())));
	        
	        modifiedItemMap.put("item_name", item.getName());
	        modifiedItemMap.put("item_brand", item.getBrand());
	        modifiedItemMap.put("item_category", item.getCategory());
	        modifiedItemMap.put("item_price", itemPrice);
	        modifiedItemMap.put("item_description", item.getDescription());

	        modifiedItemList.add(modifiedItemMap);
	    }

	    // Create the custom response object
	    Map<String, Object> response = new HashMap<>();
	    response.put("itemList", modifiedItemList);
	    response.put("totalBill", totalBill);

	    return ResponseEntity.ok(response);
	}


	
}