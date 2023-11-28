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
import com.shop.model.Item;
import com.shop.model.ShopOwnerJob;
import com.shop.repositary.ItemRepo;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ItemController {

	@Autowired
    private ItemRepo itemRepo;
	
	@GetMapping("/getItems")
    public List<Item> getAllItems() {
        return itemRepo.findAll();
    }
	
	@PostMapping("/addItems")
    public Item addItem(@RequestBody Item item) {
        return itemRepo.save(item);
    }
	
	 @GetMapping("/getItems/{id}")
	    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
	    	Item item = itemRepo.findById(id)
	                .orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));
	        return ResponseEntity.ok(item);
	 }
	 
	 @PutMapping("/UpdateItems/{id}")
	    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item newItem) {
	    	Item item = itemRepo.findById(id)
	                .orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));
	        
	    	item.setName(newItem.getName());
	    	item.setPrice(newItem.getPrice());
	    	item.setBrand(newItem.getBrand());
	    	item.setDescription(newItem.getDescription());
	    	item.setDiscount_percentage(newItem.getDiscount_percentage());
	    	item.setQuantity(newItem.getQuantity());
	    	item.setImage(newItem.getImage());
	    	item.setCategory(newItem.getCategory());
	        
	        Item updatedItem = itemRepo.save(item);
	        return ResponseEntity.ok(updatedItem);
	    }
	 
	 @DeleteMapping("/deleteItem/{id}")
	    public ResponseEntity<Map<String, Boolean>> deleteItem(@PathVariable Long id) {
		 Item item = itemRepo.findById(id)
	                .orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));
		 
	        itemRepo.delete(item);
	        Map<String, Boolean> response = new HashMap<>();
	        response.put("deleted", Boolean.TRUE);
	        return ResponseEntity.ok(response);
	    }
	 
	 
	 @GetMapping("/getItemsByCategory/{category}")
	 public List<Item> getItemByCategory(@PathVariable String category){
		 return itemRepo.findAllByCategory(category);
	 }
	 
	 @GetMapping("/Item/{id}")
	 public List<Object> getItemByShopId(@PathVariable Long id){
		 return itemRepo.getItemsByShopId(id);
	 }
		
	
}
