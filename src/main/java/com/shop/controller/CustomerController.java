package com.shop.controller;

import java.util.List;
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
import com.shop.model.Login;
import com.shop.model.ShopOwnerJob;
import com.shop.repositary.CustomerRepo;
import com.shop.repositary.LoginRepo;
import com.shop.repositary.ShopOwnerJobRepo;
import com.shop.service.CustomerService;
import com.shop.service.SmsService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestParam;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CustomerController {

	@Autowired
	private CustomerRepo customerRepo;

	@Autowired
	private CustomerService service;

	@Autowired
	private LoginRepo loginRepo;

	@Autowired
	private SmsService whatsapp;

	@Autowired
	private ShopOwnerJobRepo jobRepo;

	// add Customer
	@PostMapping("/CustomerDetails")
	public ResponseEntity<String> addCustomer(@Valid @RequestBody Customer customer) {

		Optional<Login> existingUser = loginRepo.findByUsername(customer.getUsername());
		// Optional<Customer> existingUser =
		// customerRepo.findByUsername(customer.getUsername());

		if (existingUser.isPresent()) {
			return ResponseEntity.status(401).body("Please find another username..");
		} else {
			Customer savedCustomer = service.createCustomer(customer);
//			whatsapp.sendSMS("+94" + savedCustomer.getPhone(),
//					"wellcome " + savedCustomer.getName() + " to shpop2door... You have successfully sign in.");
			return ResponseEntity.ok("Registration successful!");
		}

		// Customer savedCustomer = service.createCustomer(customer);
		// return new ResponseEntity<Customer>(savedCustomer, HttpStatus.CREATED);
	}

	@GetMapping("/CustomerDetails")
	public List<Customer> getCustomers() {
		return customerRepo.findAll();
	}

	@GetMapping("/CustomerDetails/{username}")
	public ResponseEntity<Customer> getCustomerByUsername(@PathVariable String username) {
		Customer customer = customerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFound("Customer not found with username: " + username));
		return ResponseEntity.ok(customer);
	}

	@PutMapping("/CustomerDetails/{username}")
	public ResponseEntity<Customer> updateCustomerByUsername(@PathVariable String username,
			@Valid @RequestBody Customer newCustomer) {
		Customer customer = customerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFound("Customer not found with username: " + username));

		customer.setAddress(newCustomer.getAddress());
		customer.setEmail(newCustomer.getEmail());
		customer.setName(newCustomer.getName());
		// customer.setPassword(newCustomer.getPassword());
		customer.setPhone(newCustomer.getPhone());
		// customer.setUsername(newCustomer.getUsername());

		Customer updatedCustomer = customerRepo.save(customer);
		return ResponseEntity.ok(updatedCustomer);
	}

	@DeleteMapping("/CustomerDetails/{username}")
	public ResponseEntity<String> deleteCustomer(@PathVariable String username) {
		Customer customer = customerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFound("Customer not found with username: " + username));

		customer.setDeleted(true);
		customerRepo.save(customer);
		String msg = "Customer successfully deleted!";
		return ResponseEntity.ok(msg);
	}

	// customer apply for the job
	@PostMapping("CustomerAddJob/{username}/{jobid}")
	public ResponseEntity<String> customerJobApplication(@PathVariable long jobid, @PathVariable String username) {

		ShopOwnerJob job = jobRepo.findById(jobid)
				.orElseThrow(() -> new ResourceNotFound("job with id " + jobid + " not found!!"));
		Customer customer = customerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFound(username + " not found!"));
		Set<ShopOwnerJob> jobs = customer.getAppliedJobs();
		jobs.add(job);
		customer.setAppliedJobs(jobs);
		customerRepo.save(customer);
		return ResponseEntity.ok("Applied to the job");
	}

	// customer remove application for the job
	@PostMapping("CustomerRemoveJob/{username}/{jobid}")
	public ResponseEntity<String> customerJobApplicationRemove(@PathVariable long jobid,
			@PathVariable String username) {

		ShopOwnerJob job = jobRepo.findById(jobid)
				.orElseThrow(() -> new ResourceNotFound("job with id " + jobid + " not found!!"));
		Customer customer = customerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFound(username + " not found!"));
		Set<ShopOwnerJob> jobs = customer.getAppliedJobs();
		jobs.remove(job);
		customer.setAppliedJobs(jobs);
		customerRepo.save(customer);
		return ResponseEntity.ok("Removed the Application from the job.");
	}

	// show all the jobs that a particular customer applied
	@GetMapping("AppliedJobs/{username}")
	public ResponseEntity<Set<ShopOwnerJob>> appliedJobs(@PathVariable String username) {

		Customer customer = customerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFound(username + " not found!"));
		Set<ShopOwnerJob> appliedjobs = customer.getAppliedJobs();
		return new ResponseEntity<Set<ShopOwnerJob>>(appliedjobs, HttpStatus.OK);
	}

	// show all the active jobs
	@GetMapping("ActiveJobs")
	public ResponseEntity<Set<ShopOwnerJob>> getActiveJobs(@RequestParam String param) {

		Set<ShopOwnerJob> openjobs = jobRepo.getOpenJobs();
		return new ResponseEntity<Set<ShopOwnerJob>>(openjobs, HttpStatus.OK);
	}

}
