package com.shop.controller;

import java.time.LocalDate;
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
import com.shop.model.Customer;
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

	/*
	 * @PutMapping("/ShopOwnerItem/{id}") public ResponseEntity<String>
	 * updateItemList(@PathVariable int id, @RequestBody Item newItem) { ShopOwner
	 * shop = shopOwnerRepo.findById(id) .orElseThrow(() -> new
	 * ResourceNotFound("Job Posting not found with id: " + id));
	 * 
	 * // Item item = new Item()
	 * 
	 * shop.getItems().add(newItem);
	 * 
	 * newItem.setShopOwner(shop);
	 * 
	 * // ShopOwner updatedShop = shopOwnerRepo.save(shop);
	 * 
	 * itemRepo.save(newItem); shopOwnerRepo.save(shop);
	 * 
	 * return ResponseEntity.ok("Successfully added item.."); }
	 */

	@PutMapping("/ShopOwnerItem/{username}")
	public ResponseEntity<String> updateItemList(@PathVariable String username, @RequestBody Item newItem) {
		ShopOwner shop = shopOwnerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFound("Shop Owner not found with username: " + username));

		// Item item = new Item()

		shop.getItems().add(newItem);

		newItem.setShopOwner(shop);

		// ShopOwner updatedShop = shopOwnerRepo.save(shop);

		itemRepo.save(newItem);
		shopOwnerRepo.save(shop);

		return ResponseEntity.ok("Successfully added item..");
	}

	/*
	 * @PutMapping("/ShopOwnerJob/{id}") public ResponseEntity<String>
	 * updateJobs(@PathVariable int id, @RequestBody ShopOwnerJob newJob) {
	 * ShopOwner shop = shopOwnerRepo.findById(id) .orElseThrow(() -> new
	 * ResourceNotFound("Job Posting not found with id: " + id));
	 * 
	 * // Item item = new Item() newJob.setApplicationStatus("open");
	 * newJob.setApplicationPostingDate(LocalDate.now());
	 * 
	 * shop.getJobs().add(newJob);
	 * 
	 * newJob.setShop(shop);
	 * 
	 * // ShopOwner updatedShop = shopOwnerRepo.save(shop);
	 * 
	 * shopOwnerJobRepo.save(newJob); shopOwnerRepo.save(shop);
	 * 
	 * return ResponseEntity.ok("Successfully Posted the job."); }
	 */

	@PutMapping("/ShopOwnerJob/{username}")
	public ResponseEntity<String> updateJobs(@PathVariable String username, @RequestBody ShopOwnerJob newJob) {
		ShopOwner shop = shopOwnerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFound("Shop Owner not found with username: " + username));

		// Item item = new Item()

		shop.getJobs().add(newJob);
		newJob.setApplicationStatus("open");
		newJob.setApplicationPostingDate(LocalDate.now());
		newJob.setShop(shop);

		// ShopOwner updatedShop = shopOwnerRepo.save(shop);

		shopOwnerJobRepo.save(newJob);
		shopOwnerRepo.save(shop);

		return ResponseEntity.ok("Successfully added job..");
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
		job.setApplicationPostingDate(LocalDate.now());
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
				.orElseThrow(() -> new ResourceNotFound("ShopOwner not found with username: " + username));

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

	// shop owner jobs candidates details
	@GetMapping("ShopOwnerJobsDetails/{username}")
	public ResponseEntity<HashMap<Long, Set<Customer>>> shopOwnerjobDetails(@PathVariable String username) {
		ShopOwner shop = shopOwnerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFound(username + " not found!"));

		List<ShopOwnerJob> jobs = shop.getJobs();
		HashMap<Long, Set<Customer>> listofcandidates = new HashMap<>();
		for (ShopOwnerJob job : jobs) {
			Set<Customer> candidates = job.getCandidate();
			Long jobid = job.getId();
			listofcandidates.put(jobid, candidates);
		}
		return new ResponseEntity<HashMap<Long, Set<Customer>>>(listofcandidates, HttpStatus.OK);
	}

	@GetMapping("getPendingOrders/{username}")
	public ResponseEntity<List<Long>> getPendingOrders(@PathVariable String username) {
		ShopOwner shop = shopOwnerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFound("Shop Owner not found with username: " + username));

		List<Long> orderList = shopOwnerRepo.getPendingOrders(shop.getUser_id());
		return ResponseEntity.ok(orderList);
	}

	@GetMapping("getPendingOrderItems/{username}/{orderId}")
	public ResponseEntity<List<Object>> getPendingOrderItems(@PathVariable String username,
			@PathVariable Long orderId) {
		ShopOwner shop = shopOwnerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFound("Shop Owner not found with username: " + username));

		List<Object> itemList = shopOwnerRepo.getPendingOrdersItems(shop.getUser_id(), orderId);
		return ResponseEntity.ok(itemList);
	}

	// another end point to get candidates belongs to a job that belongs to shop
	// owner
	@GetMapping("getJobsDetailsofShopOwner/{username}")
	public ResponseEntity<List<ShopOwnerJob>> getJobsDetailsOfShopOwner(@PathVariable String username) {
		ShopOwner shop = shopOwnerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFound(username + "user not found!"));
		List<ShopOwnerJob> jobs = shop.getJobs();
		return new ResponseEntity<List<ShopOwnerJob>>(jobs, HttpStatus.OK);
	}

}
