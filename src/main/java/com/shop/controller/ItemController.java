package com.shop.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ItemController {

	@Autowired
    private ItemRepo itemRepo;
	
	@GetMapping("/Item")
    public List<Item> getAllItems() {
        return itemRepo.findAll();
    }
	

	@PostMapping("/addItems")
    public ResponseEntity<Item> addItem(@Valid @RequestBody Item item) {
		Item newItem = itemRepo.save(item);
        return new ResponseEntity<Item>(newItem,HttpStatus.CREATED);
    }
	
	 @GetMapping("/Item/{id}") // Item ID
	    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
	    	Item item = itemRepo.findById(id)
	                .orElseThrow(() -> new ResourceNotFound("Item not found with id: " + id));
	        return ResponseEntity.ok(item);
	 }
	 
	 @PutMapping("/Item/{id}")
	    public ResponseEntity<Item> updateItem(@PathVariable Long id,@Valid @RequestBody Item newItem) {
	    	Item item = itemRepo.findById(id)
	                .orElseThrow(() -> new ResourceNotFound("Item not found with id: " + id));
	        
	    	item.setName(newItem.getName());
	    	item.setPrice(newItem.getPrice());
	    	item.setBrand(newItem.getBrand());
	    	item.setDescription(newItem.getDescription());
	    	item.setDiscount_percentage(newItem.getDiscount_percentage());
	    	item.setQuantity(newItem.getQuantity());
	    	item.setImage(newItem.getImage());
	    	item.setCategory(newItem.getCategory());
	    	item.setReorder_point(newItem.getReorder_point());
	        
	        Item updatedItem = itemRepo.save(item);
	        return ResponseEntity.ok(updatedItem);
	    }
	 
	 @DeleteMapping("/deleteItem/{id}")
	    public ResponseEntity<Map<String, Boolean>> deleteItem(@PathVariable Long id) {
		 Item item = itemRepo.findById(id)
	                .orElseThrow(() -> new ResourceNotFound("Item not found with id: " + id));
		 
	        itemRepo.delete(item);
	        Map<String, Boolean> response = new HashMap<>();
	        response.put("deleted", Boolean.TRUE);
	        return ResponseEntity.ok(response);
	    }
	 
	 
	 @GetMapping("/ItemByCategory/{category}")
	 public List<Item> getItemByCategory(@PathVariable String category){
		 return itemRepo.findAllByCategory(category);
	 }
	 
	 @GetMapping("/ItemByShop/{id}")
	 public List<Item> getItemByShopId(@PathVariable Long id){
		 return itemRepo.getItemsByShopId(id);
	 }
	 
	 @GetMapping("ItemPrice/{id}")
		public float findItemPriceByItemID(@PathVariable long id) {
		 
		 	float price = 0;
		 	float discount_price = 0;
		 	
		    List<Object[]> resultList = itemRepo.getItemPriceByItemId(id);
		    List<Map<String, Object>> outputList = new ArrayList<>();

		    for (Object[] result : resultList) {
		        Map<String, Object> resultMap = new HashMap<>();
		        resultMap.put("item_id", result[0]);
		        resultMap.put("price", result[1]);
		        resultMap.put("discount_percentage", result[2]);
		        
		        discount_price = Float.parseFloat(result[1].toString())*Float.parseFloat(result[2].toString());
		        price = Float.parseFloat(result[1].toString())-discount_price;
		        
		        resultMap.put("Price_with_discount", price);
		        
		        outputList.add(resultMap);
		        
		    }

		    return price;
		}
		
		
	
}