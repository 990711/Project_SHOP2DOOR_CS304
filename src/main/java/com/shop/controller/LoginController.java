package com.shop.controller;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

//package net.javaguides.springboot.util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.security.crypto.password.PasswordEncoder;

import com.shop.exception.ResourceNotFoundException;
import com.shop.model.Login;
import com.shop.repository.LoginRepo;

//import net.javaguides.springboot.model.Product;

@RestController
@RequestMapping("/api/v1/")

public class LoginController {
	
	@Autowired
    private LoginRepo loginRepo;
    
    /*
    // Get all users
    @GetMapping("/users")
    public List<Login> getAllUsers() {
        return loginRepo.findAll();
    }

    
    */

    /*
    // Create user rest api
    @PostMapping(value = "/users", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Login createuser(@RequestBody Login login) {
        return loginRepo.save(login);
    }
    
    */
 // Create user rest api
    @PostMapping(value = "/users", consumes = MediaType.APPLICATION_JSON_VALUE)
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
    
    
    
    /*
    
    @PostMapping(value = "/userlogin", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> handleLogin(@RequestBody Login login) {
        // Extract username and password from the request
        String username = login.getUsername();
        String password = login.getPassword();
        


        // Perform necessary validation on username and password
        if (username == null || password == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username and password are required.");
        }

        // Check if the user exists
        
        Optional<Login> existingUser = loginRepo.findByUsername(username);
        
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(password) ) {
        	//String userRole = existingUser.get().getRole();
            //return ResponseEntity.ok().body(Collections.singletonMap("userRole", userRole));
            return ResponseEntity.ok().build();
        } else {
            // Authentication failed
            // Return a ResponseEntity indicating failure
            return ResponseEntity.status(401).build();
        }
    }
*/
    
    @PostMapping(value = "/userlogin", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> handleLogin(@RequestBody Login login) {
        // Extract username and password from the request
        String username = login.getUsername();
        String password = login.getPassword();
        String role = login.getRole();


        // Perform necessary validation on username and password
        if (username == null || password == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username and password are required.");
        }

        // Check if the user exists
        
        Optional<Login> existingUser = loginRepo.findByUsername(username);
        
        if (existingUser.isPresent()) {
        	if(existingUser.get().getPassword().equals(password))
        	{
        		if(existingUser.get().getRole().equals(role))
        		{
        			return ResponseEntity.ok().build();
        		}
        		else {
                    // Authentication failed
                    // Return a ResponseEntity indicating failure
                    return ResponseEntity.status(401).build();
                }
        	}else {
                // Authentication failed
                // Return a ResponseEntity indicating failure
                return ResponseEntity.status(401).build();
            }
        }
        else {
            // Authentication failed
            // Return a ResponseEntity indicating failure
            return ResponseEntity.status(401).build();
        }
	
    }
    
    
    
    /*
    
    
    if (existingUser.isPresent() && existingUser.get().getPassword().equals(password) && existingUser.get().getRole().equals(role)) {
    	//serRole = existingUser.get().getRole();
            //return ResponseEntity.ok().body(Collections.singletonMap("userRole", userRole));
            return ResponseEntity.ok().build();
    }
    */
    
    


    
    /*

    // Get user by id rest api
    @GetMapping("/users/{id}")
    public ResponseEntity<Login> getUserByUserName(@PathVariable String username) {
    	Login login = loginRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist with name: " + username));
        return ResponseEntity.ok(login);
    }
    
 // Get user by username rest api
    @GetMapping("/users/{username}")
    public ResponseEntity<Login> getUserById(@PathVariable Long id) {
    	Login login = loginRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist with id: " + id));
        return ResponseEntity.ok(login);
    }
    
    

    // Update product rest api
    @PutMapping("/users/{id}")
    public ResponseEntity<Login> updateUserById(@PathVariable Long id, @RequestBody Login userDetails) {
    	Login login = loginRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user does not exist with id: " + id));

    	login.setUsername(userDetails.getUsername());
    	login.setPassword(userDetails.getPassword());
    	login.setRole(userDetails.getRole());
        

    	Login updatedUser = loginRepo.save(login);
        return ResponseEntity.ok(updatedUser);
    }

    // Delete product rest api
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id) {
    	Login login = loginRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist with id: " + id));

    	loginRepo.delete(login);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    */

}
