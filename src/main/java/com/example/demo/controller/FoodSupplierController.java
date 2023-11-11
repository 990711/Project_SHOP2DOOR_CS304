package com.example.demo.controller;

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

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.FoodSupplier;
import com.example.demo.repository.FoodSupplierRepository;

@RestController
@RequestMapping("/api/v1/")

public class FoodSupplierController {
    @Autowired
    private FoodSupplierRepository foodSupplierRepository;

    // Get all products
    @GetMapping("/foodSuppliers")
    public List<FoodSupplier> getAllFoodSuppliers() {
        return foodSupplierRepository.findAll();
    }

    // Create product rest api
    @PostMapping("/foodSuppliers")
    public FoodSupplier createFoodSupplier(@RequestBody FoodSupplier foodSupplier) {
        return foodSupplierRepository.save(foodSupplier);
    }

    // Get product by id rest api
    /*@GetMapping("/foodSuppliers/{id}")
    public ResponseEntity<FoodSupplier> getFoodSupplierById(@PathVariable Long id) {
        FoodSupplier foodSupplier = foodSupplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FoodSupplier does not exist with id: " + id));
        return ResponseEntity.ok(foodSupplier);
    }

    // Update product rest api
    @PutMapping("/foodSuppliers/{id}")
    public ResponseEntity<FoodSupplier> updateFoodSupplierById(@PathVariable Long id, @RequestBody FoodSupplier foodSupplierDetails) {
        FoodSupplier foodSupplier = foodSupplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FoodSupplier does not exist with id: " + id));

        foodSupplier.setName(foodSupplierDetails.getName());
           
        FoodSupplier updatedFoodSupplier = foodSupplierRepository.save(foodSupplier);
        return ResponseEntity.ok(updatedFoodSupplier);
    }*/

    //    Get and set by name
    @GetMapping("/foodSuppliers/{name}")
    public ResponseEntity<FoodSupplier> getFoodSupplierById(@PathVariable String name) {
        // Retrieve the user by name from the database
        List<FoodSupplier> allFoodSuppliers = foodSupplierRepository.findAll();
        FoodSupplier matchingUser = null;
        for (FoodSupplier foodSupplierItr : allFoodSuppliers) {
            if (foodSupplierItr.getName().equals(name)) {
                matchingUser = foodSupplierItr;
//                matchingUser = new FoodSupplier(foodSupplier.getId(), foodSupplierItr.getName(), foodSupplierItr.getMobileNo());
                break;
            }
        }

        return ResponseEntity.ok(matchingUser);
    }

    // Update product rest api
    /*@PutMapping("/foodSuppliers/{id}")
    public ResponseEntity<FoodSupplier> updateFoodSupplierById(@PathVariable Long id, @RequestBody FoodSupplier foodSupplierDetails) {

        // Retrieve the user by name from the database
        List<FoodSupplier> allFoodSuppliers = foodSupplierRepository.findAll();
        FoodSupplier matchingUser = null;
        for (FoodSupplier foodSupplierItr : allFoodSuppliers) {
            if (foodSupplierItr.getName().equals(foodSupplier.getName()) && foodSupplierItr.getPassword().equals(foodSupplier.getPassword())) {
                matchingUser = foodSupplier;
//                matchingUser = new FoodSupplier(foodSupplier.getId(), foodSupplierItr.getName(), foodSupplierItr.getMobileNo());
                break;
            }
        }
        foodSupplier.setName(foodSupplierDetails.getName());

        FoodSupplier updatedFoodSupplier = foodSupplierRepository.save(foodSupplier);
        return ResponseEntity.ok(updatedFoodSupplier);
    }*/


    // Delete product rest api
    @DeleteMapping("/foodSuppliers/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteFoodSupplier(@PathVariable Long id) {
        FoodSupplier foodSupplier = foodSupplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FoodSupplier does not exist with id: " + id));

        foodSupplierRepository.delete(foodSupplier);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<FoodSupplier> login(@RequestBody FoodSupplier foodSupplier) {

        System.out.println(foodSupplier.getName());
        System.out.println(foodSupplier.getPassword());

        // Retrieve the user by name from the database
        List<FoodSupplier> allUsers = foodSupplierRepository.findAll();
        FoodSupplier matchingUser = null;
        for (FoodSupplier foodSupplierItr : allUsers) {
            if (foodSupplierItr.getName().equals(foodSupplier.getName()) && foodSupplierItr.getPassword().equals(foodSupplier.getPassword())) {
                matchingUser = foodSupplier;
//                matchingUser = new FoodSupplier(foodSupplier.getId(), foodSupplierItr.getName(), foodSupplierItr.getMobileNo());
                break;
            }
        }

        if (matchingUser != null) {
            // User found
//            matchingUser.setPassword(null);
            System.out.println(matchingUser.getId());
            return ResponseEntity.ok(matchingUser);
        } else {
            throw new ResourceNotFoundException("Invalid credentials");
        }
    }
    @PostMapping("/register")
    public ResponseEntity<FoodSupplier> register(@RequestBody FoodSupplier foodSupplier) {
        // Save the user data to the database
        foodSupplierRepository.save(foodSupplier);

        return ResponseEntity.ok(foodSupplier);
    }
}



