package com.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.model.Login;
import com.shop.repositary.LoginRepo;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v2/")
public class LoginController {

	@Autowired
	private LoginRepo loginRepo;
	
	// Get Riders
	@GetMapping("/LoginDetails")
	public List<Login> getAllRiders(){
		return loginRepo.findAll();
	}
	
	// Add Rider
	@PostMapping("/LoginDetails")
	public Login addRider(@RequestBody Login user) {
		return loginRepo.save(user);
	}
	
}
