package com.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.model.Login;
import com.shop.repositary.LoginRepo;
import com.shop.service.LoginService;
import com.shop.service.SmsService;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v2/")
public class LoginController {

	@Autowired
	private LoginRepo loginRepo;

	@Autowired
	private LoginService service;
	
	@Autowired
	private SmsService smsservice;

	// Get Riders
	@GetMapping("/LoginDetails")
	public List<Login> getAllRiders() {
		smsservice.sendSMS("+94714064457", "this is the message");
		return loginRepo.findAll();
	}

	// Add Rider
	@PostMapping("/LoginDetails")
	public ResponseEntity<Login> addRider(@Valid @RequestBody Login user) {

		Login savedLogin = service.createLogin(user);
		return new ResponseEntity<Login>(savedLogin, HttpStatus.CREATED);
	}

}
