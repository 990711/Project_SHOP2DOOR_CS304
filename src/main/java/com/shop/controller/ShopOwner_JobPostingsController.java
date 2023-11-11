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

import com.shop.exception.ResourceNotFoundException;
import com.shop.model.ShopOwner_JobPostings;
import com.shop.repository.ShopOwner_JobPostingsRepository;

@RestController
@RequestMapping("/api/v1/") // Base path for JobPostings API

public class ShopOwner_JobPostingsController {
	@Autowired
    private ShopOwner_JobPostingsRepository shopOwner_jobPostingsRepository;

    // Get all job postings
    @GetMapping("/shopowner_jobpostings")
    public List<ShopOwner_JobPostings> getAllJobPostings() {
        return shopOwner_jobPostingsRepository.findAll();
    }

    // Create a new job posting
    @PostMapping("/shopowner_jobpostings")
    public ShopOwner_JobPostings createJobPosting(@RequestBody ShopOwner_JobPostings shopowner_jobpostings) {
        return shopOwner_jobPostingsRepository.save(shopowner_jobpostings);
    }

    // Get a job posting by ID
    @GetMapping("/shopowner_jobpostings/{id}")
    public ResponseEntity<ShopOwner_JobPostings> getJobPostingById(@PathVariable Long id) {
    	ShopOwner_JobPostings shopowner_jobpostings = shopOwner_jobPostingsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job Posting not found with id: " + id));
        return ResponseEntity.ok(shopowner_jobpostings);
    }

    // Update a job posting by ID
    @PutMapping("/shopowner_jobpostings/{id}")
    public ResponseEntity<ShopOwner_JobPostings> updateJobPosting(@PathVariable Long id, @RequestBody ShopOwner_JobPostings jobPostingsDetails) {
    	ShopOwner_JobPostings shopowner_jobpostings = shopOwner_jobPostingsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job Posting not found with id: " + id));
        
   
    	shopowner_jobpostings.setJobTitle(jobPostingsDetails.getJobTitle());
    	shopowner_jobpostings.setDescription(jobPostingsDetails.getDescription());
    	shopowner_jobpostings.setApplicationDeadline(jobPostingsDetails.getApplicationDeadline());
    	shopowner_jobpostings.setApplicationStatus(jobPostingsDetails.getApplicationStatus());
 
        
        // Add more fields to update as needed
        
        ShopOwner_JobPostings updatedJobPosting = shopOwner_jobPostingsRepository.save(shopowner_jobpostings);
        return ResponseEntity.ok(updatedJobPosting);
    }

    // Delete a job posting by ID
    @DeleteMapping("/shopowner_jobpostings/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteJobPosting(@PathVariable Long id) {
    	ShopOwner_JobPostings shopowner_jobpostings = shopOwner_jobPostingsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job Posting not found with id: " + id));
        
        shopOwner_jobPostingsRepository.delete(shopowner_jobpostings);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
