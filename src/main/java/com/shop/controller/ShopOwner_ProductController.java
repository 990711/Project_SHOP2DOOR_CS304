package com.shop.controller;
import java.util.HashMap;

import java.util.List;
import java.util.Map;

//package net.javaguides.springboot.util;
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
import com.shop.model.ShopOwner_Product;
import com.shop.repository.ShopOwner_ProductRepository;

//import net.javaguides.springboot.model.Product;

@RestController
@RequestMapping("/api/v1/")

public class ShopOwner_ProductController {
	
	@Autowired
    private ShopOwner_ProductRepository shopOwner_productRepository;
    
    
    // Get all products
    @GetMapping("/shopowner_products")
    public List<ShopOwner_Product> getAllProducts() {
        return shopOwner_productRepository.findAll();
    }

    
    

    // Create product rest api
    @PostMapping("/shopowner_products")
    public ShopOwner_Product createProduct(@RequestBody ShopOwner_Product shopowner_product) {
        return shopOwner_productRepository.save(shopowner_product);
    }
    
    

    
    

    // Get product by id rest api
    @GetMapping("/shopowner_products/{id}")
    public ResponseEntity<ShopOwner_Product> getProductById(@PathVariable Long id) {
    	ShopOwner_Product shopowner_product = shopOwner_productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product does not exist with id: " + id));
        return ResponseEntity.ok(shopowner_product);
    }

    // Update product rest api
    @PutMapping("/shopowner_products/{id}")
    public ResponseEntity<ShopOwner_Product> updateProductById(@PathVariable Long id, @RequestBody ShopOwner_Product productDetails) {
    	ShopOwner_Product shopowner_product = shopOwner_productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product does not exist with id: " + id));

    	shopowner_product.setName(productDetails.getName());
    	shopowner_product.setDescription(productDetails.getDescription());
    	shopowner_product.setPrice(productDetails.getPrice());
    	shopowner_product.setQuantity(productDetails.getQuantity());
    	shopowner_product.setDiscountPrice(productDetails.getDiscountPrice());
    	shopowner_product.setDiscountPercentage(productDetails.getDiscountPercentage());
        

    	ShopOwner_Product updatedProduct = shopOwner_productRepository.save(shopowner_product);
        return ResponseEntity.ok(updatedProduct);
    }

    // Delete product rest api
    @DeleteMapping("/shopowner_products/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable Long id) {
    	ShopOwner_Product shopowner_product = shopOwner_productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product does not exist with id: " + id));

    	shopOwner_productRepository.delete(shopowner_product);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
