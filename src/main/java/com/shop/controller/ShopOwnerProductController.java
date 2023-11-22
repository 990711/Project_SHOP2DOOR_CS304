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

import com.shop.exception.ResourceNotFound;
import com.shop.model.ShopOwnerProduct;
import com.shop.repositary.ShopOwnerProductRepo;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ShopOwnerProductController {

	@Autowired
    private ShopOwnerProductRepo shopOwner_productRepository;
    
    
    // Get all products
    @GetMapping("/shopowner_products")
    public List<ShopOwnerProduct> getAllProducts() {
        return shopOwner_productRepository.findAll();
    }

    
    

    // Create product rest api
    @PostMapping("/shopowner_products")
    public ShopOwnerProduct createProduct(@RequestBody ShopOwnerProduct shopowner_product) {
        return shopOwner_productRepository.save(shopowner_product);
    }
    
    

    
    

    // Get product by id rest api
    @GetMapping("/shopowner_products/{id}")
    public ResponseEntity<ShopOwnerProduct> getProductById(@PathVariable Long id) {
    	ShopOwnerProduct shopowner_product = shopOwner_productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Product does not exist with id: " + id));
        return ResponseEntity.ok(shopowner_product);
    }

    // Update product rest api
    @PutMapping("/shopowner_products/{id}")
    public ResponseEntity<ShopOwnerProduct> updateProductById(@PathVariable Long id, @RequestBody ShopOwnerProduct productDetails) {
    	ShopOwnerProduct shopowner_product = shopOwner_productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Product does not exist with id: " + id));

    	shopowner_product.setName(productDetails.getName());
    	shopowner_product.setDescription(productDetails.getDescription());
    	shopowner_product.setPrice(productDetails.getPrice());
    	shopowner_product.setQuantity(productDetails.getQuantity());
    	shopowner_product.setDiscountPrice(productDetails.getDiscountPrice());
    	shopowner_product.setDiscountPercentage(productDetails.getDiscountPercentage());
        

    	ShopOwnerProduct updatedProduct = shopOwner_productRepository.save(shopowner_product);
        return ResponseEntity.ok(updatedProduct);
    }

    // Delete product rest api
    @DeleteMapping("/shopowner_products/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable Long id) {
    	ShopOwnerProduct shopowner_product = shopOwner_productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Product does not exist with id: " + id));

    	shopOwner_productRepository.delete(shopowner_product);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
	
}
