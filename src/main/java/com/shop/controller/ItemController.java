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
import com.shop.repository.ItemRepo;


@RestController
@RequestMapping("/api/v1/")
public class ItemController {

	@Autowired
    private ItemRepo itemRepo;
	
	@GetMapping("/Items")
    public List<Item> getAllItems() {
        return itemRepo.findAll();
    }
	
	@PostMapping("/Items")
    public Item addItem(@RequestBody Item item) {
        return itemRepo.save(item);
    }
	
	 @GetMapping("/Items/{id}")
	    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
	    	Item item = itemRepo.findById(id)
	                .orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));
	        return ResponseEntity.ok(item);
	 }
	 
	 @PutMapping("/Items/{id}")
	    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item newItem) {
	    	Item item = itemRepo.findById(id)
	                .orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));
	        
	    	item.setName(newItem.getName());
	    	item.setPrice(newItem.getPrice());
	    	item.setBrand(newItem.getBrand());
	    	item.setCategory(newItem.getCategory());
	    	item.setDescription(newItem.getDescription());
	    	item.setDiscount_percentage(newItem.getDiscount_percentage());
	    	item.setQuantity(newItem.getQuantity());
	        
	        Item updatedItem = itemRepo.save(item);
	        return ResponseEntity.ok(updatedItem);
	    }
	 
	 @DeleteMapping("/Items/{id}")
	    public ResponseEntity<Map<String, Boolean>> deleteItem(@PathVariable Long id) {
		 Item item = itemRepo.findById(id)
	                .orElseThrow(() -> new ResourceNotFound("Job Posting not found with id: " + id));
		 
	        itemRepo.delete(item);
	        Map<String, Boolean> response = new HashMap<>();
	        response.put("deleted", Boolean.TRUE);
	        return ResponseEntity.ok(response);
	    }
	 
	 
	 @GetMapping("/Itemsbycategory/{category}")
	 public List<Item> getItemByCategory(@PathVariable String category){
		 return itemRepo.findAllByCategory(category);
	 }
		
	
}
