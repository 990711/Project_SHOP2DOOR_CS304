package com.shop.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import com.shop.model.UserRole;
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

	// Get users
	@GetMapping("/LoginDetails")

	public List<Login> getAllUsers() {
		return loginRepo.findAll();
	}

	// Add User
	@PostMapping("/Login") // not use in URL
	public ResponseEntity<Login> addUser(@Valid @RequestBody Login user) {
		
		Login savedLogin = service.createLogin(user);
		return new ResponseEntity<Login>(savedLogin, HttpStatus.CREATED);
	}
	
	
	/*@DeleteMapping("/LoginDetails/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable int id){
		Login login = loginRepo.findById(id).orElseThrow(()-> new ResourceNotFound("User does not exist with id "+id));
		login.setDeleted(true);
		loginRepo.save(login);
		String msg = "User successfully deleted!";
		return ResponseEntity.ok(msg);
	}*/
	
	@DeleteMapping("/LoginDetails/{username}")
	public ResponseEntity<String> deleteUser(@PathVariable String username){
		Login login = loginRepo.findByUsername(username).orElseThrow(()-> new ResourceNotFound("User does not exist with username "+username));
		login.setDeleted(true);
		loginRepo.save(login);
		String msg = "User successfully deleted!";
		return ResponseEntity.ok(msg);
	}
	
	/*@PostMapping("/Login")
    public ResponseEntity<String> handleLogin(@RequestBody Login login) {
        // Extract username and password from the request
        String username = login.getUsername();
        String password = login.getPassword();
        UserRole role = login.getRole();

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
	
    }*/
	
	@PutMapping("/LoginDetails") // Login
    public ResponseEntity<Object> handleLogin(@RequestBody Login login) {
        // Extract username and password from the request
        String username = login.getUsername();
        String password = login.getPassword();
        String role = login.getRole();

        // Check if the user exists
        
        Optional<Login> existingUser = loginRepo.findByUsername(username);
        
        if (existingUser.isPresent()) {
        	
        	if(existingUser.get().isDeleted()) {
        		return ResponseEntity.status(401).body("Cannot Login! User has been deleted!");
        	}else if(existingUser.get().isBlocked()) {
        		return ResponseEntity.status(401).body("Cannot Login! User has been blocked!");
        	}else {
        		if(existingUser.get().getPassword().equals(password))
            	{
            		if(existingUser.get().getRole().equals(role))
            		{
            			existingUser.get().setActive(true);
            			loginRepo.save(existingUser.get());
            			
            			Map<String, Object> responseData = new HashMap<>();
                        responseData.put("status", "success");
                        responseData.put("user", existingUser.get());
                        return ResponseEntity.ok(responseData);
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
        	
        	
        }
        else {
            // Authentication failed
            // Return a ResponseEntity indicating failure
            return ResponseEntity.status(401).body("User not found");
        }
	
    }
	
	
	// Create user rest api
    /*@PostMapping("/checkUsername") // not use here
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
        
    }*/
    
    /*@PutMapping("/LoginDetails/{id}") // Logout By ID
	public ResponseEntity<String> Logout(@PathVariable int id){
		Login login = loginRepo.findById(id).orElseThrow(()-> new ResourceNotFound("User does not exist with id "+id));
		login.setActive(false);
		loginRepo.save(login);
		String msg = "User successfully logged out!";
		return ResponseEntity.ok(msg);
	}*/
    
    @PutMapping("/LoginDetails/{username}") // Logout By username
	public ResponseEntity<String> Logout(@PathVariable String username){
		Login login = loginRepo.findByUsername(username).orElseThrow(()-> new ResourceNotFound("User does not exist with username "+username));
		login.setActive(false);
		loginRepo.save(login);
		String msg = "User successfully logged out!";
		return ResponseEntity.ok(msg);
	}
    
    @PutMapping("/LoginDetailsBlock/{id}") // block a user By ID
	public ResponseEntity<String> blockUser(@PathVariable int id){
		Login login = loginRepo.findById(id).orElseThrow(()-> new ResourceNotFound("User does not exist with id "+id));
		login.setBlocked(true);
		loginRepo.save(login);
		String msg = "User Blocked!";
		return ResponseEntity.ok(msg);
    }
    
    @PutMapping("/LoginDetailsUnblock/{id}") // block a user By ID
	public ResponseEntity<String> unblockUser(@PathVariable int id){
		Login login = loginRepo.findById(id).orElseThrow(()-> new ResourceNotFound("User does not exist with id "+id));
		login.setBlocked(false);
		loginRepo.save(login);
		String msg = "User Unblocked!";
		return ResponseEntity.ok(msg);
    }

}
