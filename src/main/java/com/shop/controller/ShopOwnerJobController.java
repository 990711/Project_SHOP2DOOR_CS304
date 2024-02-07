package com.shop.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import com.shop.model.ShopOwnerJob;
import com.shop.repositary.ShopOwnerJobRepo;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ShopOwnerJobController {

	@Autowired
	private ShopOwnerJobRepo shopOwner_jobPostingsRepository;

	// Get all job postings
	@GetMapping("/shopowner_jobpostings")
	public List<ShopOwnerJob> getAllJobPostings() {
		return shopOwner_jobPostingsRepository.findAll();
	}

	// Create a new job posting
	@PostMapping("/shopowner_jobpostings")
	public ShopOwnerJob createJobPosting(@RequestBody ShopOwnerJob shopowner_jobpostings) {
		return shopOwner_jobPostingsRepository.save(shopowner_jobpostings);
	}

	// Get a job posting by ID
	@GetMapping("/shopowner_jobpostings/{id}")
	public ResponseEntity<ShopOwnerJob> getJobPostingById(@PathVariable Long id) {
		ShopOwnerJob shopowner_jobpostings = shopOwner_jobPostingsRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));
		return ResponseEntity.ok(shopowner_jobpostings);
	}

	// Update a job posting by ID
	@PutMapping("/shopowner_jobpostings/{id}")
	public ResponseEntity<ShopOwnerJob> updateJobPosting(@PathVariable Long id,
			@RequestBody ShopOwnerJob jobPostingsDetails) {
		ShopOwnerJob shopowner_jobpostings = shopOwner_jobPostingsRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));

		if (jobPostingsDetails.getApplicationStatus().equals("open") || jobPostingsDetails.getApplicationStatus().equals("reopen")) {
			shopowner_jobpostings.setJobTitle(jobPostingsDetails.getJobTitle());
			shopowner_jobpostings.setDescription(jobPostingsDetails.getDescription());
			shopowner_jobpostings.setApplicationDeadline(jobPostingsDetails.getApplicationDeadline());
			shopowner_jobpostings.setApplicationStatus(jobPostingsDetails.getApplicationStatus());
			shopowner_jobpostings.setApplicationPostingDate(LocalDate.now());

			ShopOwnerJob updatedJobPosting = shopOwner_jobPostingsRepository.save(shopowner_jobpostings);
			return ResponseEntity.ok(updatedJobPosting);
		}

		shopowner_jobpostings.setJobTitle(jobPostingsDetails.getJobTitle());
		shopowner_jobpostings.setDescription(jobPostingsDetails.getDescription());
		shopowner_jobpostings.setApplicationDeadline(jobPostingsDetails.getApplicationDeadline());
		shopowner_jobpostings.setApplicationStatus(jobPostingsDetails.getApplicationStatus());
		shopowner_jobpostings.setApplicationPostingDate(jobPostingsDetails.getApplicationPostingDate());

		// Add more fields to update as needed

		ShopOwnerJob updatedJobPosting = shopOwner_jobPostingsRepository.save(shopowner_jobpostings);
		return ResponseEntity.ok(updatedJobPosting);
	}

	// Delete a job posting by ID
	@DeleteMapping("/shopowner_jobpostings/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteJobPosting(@PathVariable Long id) {
		ShopOwnerJob shopowner_jobpostings = shopOwner_jobPostingsRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));

		shopOwner_jobPostingsRepository.delete(shopowner_jobpostings);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	// get job details using job id
	@GetMapping("/ShopOwnerJob/{id}")
	public List<ShopOwnerJob> getJobsByShopId(@PathVariable Long id) {
		return shopOwner_jobPostingsRepository.getJobsByShopId(id);
	}

	// get job candidates using job id
	@GetMapping("/ShopOwnerJobCandidates/{id}")
	public ResponseEntity<Set<Customer>> getJobCandidatesByJobId(@PathVariable Long id) {
		ShopOwnerJob job = shopOwner_jobPostingsRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFound(id + " not found!"));
		Set<Customer> candidates = job.getCandidate();
		return new ResponseEntity<Set<Customer>>(candidates, HttpStatus.OK);
	}

}
