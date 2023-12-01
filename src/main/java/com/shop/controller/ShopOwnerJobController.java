package com.shop.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.shop.model.ShopOwnerJob;
import com.shop.repository.ShopOwnerJobRepo;


@RestController
@RequestMapping("/api/v1/")
public class ShopOwnerJobController {

	@Autowired
    private ShopOwnerJobRepo shopOwner_jobPostingsRepository;

    // Get all job postings
    @GetMapping("/ShopOwnerJob")
    public List<ShopOwnerJob> getAllJobPostings() {
        return shopOwner_jobPostingsRepository.findAll();
    }

    // Create a new job posting
    @PostMapping("/ShopOwnerJob")
    public ShopOwnerJob createJobPosting(@RequestBody ShopOwnerJob shopowner_jobpostings) {
        return shopOwner_jobPostingsRepository.save(shopowner_jobpostings);
    }

    // Get a job posting by ID
    @GetMapping("/ShopOwnerJob/{id}")
    public ResponseEntity<ShopOwnerJob> getJobPostingById(@PathVariable Long id) {
    	ShopOwnerJob shopowner_jobpostings = shopOwner_jobPostingsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));
        return ResponseEntity.ok(shopowner_jobpostings);
    }

    // Update a job posting by ID
    @PutMapping("/ShopOwnerJob/{id}")
    public ResponseEntity<ShopOwnerJob> updateJobPosting(@PathVariable Long id, @RequestBody ShopOwnerJob jobPostingsDetails) {
    	ShopOwnerJob shopowner_jobpostings = shopOwner_jobPostingsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));
        
   
    	shopowner_jobpostings.setJobTitle(jobPostingsDetails.getJobTitle());
    	shopowner_jobpostings.setDescription(jobPostingsDetails.getDescription());
    	shopowner_jobpostings.setApplicationDeadline(jobPostingsDetails.getApplicationDeadline());
    	shopowner_jobpostings.setApplicationStatus(jobPostingsDetails.getApplicationStatus());
 
        
        // Add more fields to update as needed
        
        ShopOwnerJob updatedJobPosting = shopOwner_jobPostingsRepository.save(shopowner_jobpostings);
        return ResponseEntity.ok(updatedJobPosting);
    }

    // Delete a job posting by ID
    @DeleteMapping("/ShopOwnerJob/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteJobPosting(@PathVariable Long id) {
    	ShopOwnerJob shopowner_jobpostings = shopOwner_jobPostingsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));
        
        shopOwner_jobPostingsRepository.delete(shopowner_jobpostings);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
	
}
