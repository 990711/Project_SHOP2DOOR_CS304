package com.shop.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.exception.ResourceNotFound;
import com.shop.model.Login;
import com.shop.repositary.LoginRepo;
import com.shop.service.LoginService;
import com.shop.service.SmsService;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
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
	
	@PostMapping("/Login")
    public ResponseEntity<String> handleLogin(@RequestBody Login login) {
        // Extract username and password from the request
        String username = login.getUsername();
        String password = login.getPassword();
        String role = login.getRole();

        // Check if the user exists
        
        Optional<Login> existingUser = loginRepo.findByUsername(username);
        
        if (existingUser.isPresent()) {
        	if(existingUser.get().getPassword().equals(password))
        	{
        		if(existingUser.get().getRole().equals(role))
        		{
        			return ResponseEntity.ok("Login successful!");
        		}
        		else {
                    // Authentication failed
                    // Return a ResponseEntity indicating failure
                    return ResponseEntity.status(401).body("Role mismatch");
                }
        	}else {
                // Authentication failed
                // Return a ResponseEntity indicating failure
                return ResponseEntity.status(401).body("Password mismatch");
            }
        }
        else {
            // Authentication failed
            // Return a ResponseEntity indicating failure
            return ResponseEntity.status(401).body("User not found");
        }
	
    }
	
	
	// Create user rest api
    @PostMapping("/checkUsername")
    public ResponseEntity<Login> createuser(@RequestBody Login login) {
        // Check for duplicate usernames
    	Optional<Login> existingUser = loginRepo.findByUsername(login.getUsername());

    	if (existingUser.isPresent()) {
    	    // Username is taken, return 409 Conflict
    	    return ResponseEntity.status(HttpStatus.CONFLICT).build();
    	}
    	else {
    	    // Save the new user
    	    Login savedUser = loginRepo.save(login);

    	    // Return 201 Created with the saved user
    	    return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    	}
        
    }
    
    @PutMapping("/Logout/{id}")
	public ResponseEntity<String> Logout(@PathVariable int id){
		Login login = loginRepo.findById(id).orElseThrow(()-> new ResourceNotFound("Rider does not exist with id "+id));
		login.setActive(false);
		loginRepo.save(login);
		String msg = "User successfully logged out!";
		return ResponseEntity.ok(msg);
	}
    
    

}