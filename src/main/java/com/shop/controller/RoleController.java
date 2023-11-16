package com.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.shop.model.Role;
import com.shop.repositary.RoleRepo;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class RoleController {

	@Autowired
	private RoleRepo roleRepo;
	
	// Get Riders
	@GetMapping("/Roles")
	public List<Role> getAllRiders(){
		return roleRepo.findAll();
	}
	
	// Add Rider
	@PostMapping("/Roles")
	public Role addRider(@RequestBody Role role) {
		return roleRepo.save(role);
	}
	
	// update
	@PutMapping("/Roles/{id}")
	public ResponseEntity<Role> updateRole(@PathVariable int id,@RequestBody Role newRole){
		
		Role role = roleRepo.findById(id).orElseThrow(()-> new ResourceNotFound("Rider does not exist with id "+id));
		//role.setRole_id(newRole.getRole_id());
		role.setRole_name(newRole.getRole_name());
		
		Role updatedRole = roleRepo.save(role);
		return ResponseEntity.ok(updatedRole);
		
	}

	// delete Rider
	@DeleteMapping("/Roles/{id}")
	public ResponseEntity<String> deleteRider(@PathVariable int id){
		
		Role role = roleRepo.findById(id).orElseThrow(()-> new ResourceNotFound("Rider does not exist with id "+id));

		roleRepo.delete(role);
		
	    String msg = "Role with id "+id+" deleted successfully!";
	    
	    return ResponseEntity.ok(msg);
		
	}
		
	
	
}
