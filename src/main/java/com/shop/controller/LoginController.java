package com.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.exception.ResourceNotFound;
import com.shop.model.Login;
import com.shop.repositary.LoginRepo;
import com.shop.service.LoginService;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v2/")
public class LoginController {

	@Autowired
	private LoginRepo loginRepo;

	@Autowired
	private LoginService service;

	// Get Riders
	@GetMapping("/LoginDetails")
	public List<Login> getUsers() {
		return loginRepo.findAll();
	}

	// Add Rider
	@PostMapping("/LoginDetails")
	public ResponseEntity<Login> addUser(@Valid @RequestBody Login user) {

		Login savedLogin = service.createLogin(user);
		return new ResponseEntity<Login>(savedLogin, HttpStatus.CREATED);
	}
	
	
	@DeleteMapping("/LoginDetails/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable int id){
		Login login = loginRepo.findById(id).orElseThrow(()-> new ResourceNotFound("Rider does not exist with id "+id));
		login.setDeleted(true);
		loginRepo.save(login);
		String msg = "User successfully deleted!";
		return ResponseEntity.ok(msg);
	}

}
