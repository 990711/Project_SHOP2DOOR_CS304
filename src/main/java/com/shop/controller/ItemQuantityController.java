package com.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shop.exception.ResourceNotFound;
import com.shop.model.ItemQuantity;
import com.shop.model.ItemQuantityKey;
import com.shop.repositary.ItemQuantityRepo;
import com.shop.repositary.ItemRepo;
import com.shop.repositary.OrderRepo;

@RestController
@RequestMapping("/api/v1/")
public class ItemQuantityController {

	@Autowired
	ItemQuantityRepo repo;
	
	@Autowired
	OrderRepo orderRepo;
	
	@Autowired
	ItemRepo itemRepo;
	
	@GetMapping("itemquantity")
	public List<ItemQuantity> itemQuantity(){
		return repo.findAll();
	}
	
	@PostMapping("itemquantity/{order}/{item}")
	public ResponseEntity<ItemQuantity> createItemQuantity(@PathVariable long order,@PathVariable long item, @RequestBody ItemQuantity newItemQ){
		
		ItemQuantity itemQ = new ItemQuantity();
		ItemQuantityKey key = new ItemQuantityKey();
		key.setItemId(item);
		key.setOrderId(order);
		itemQ.setId(key);
		itemQ.setItem(itemRepo.findById(item).orElseThrow(() -> new ResourceNotFound("item not found!!" + item)));
		itemQ.setOrder(orderRepo.findById(order).orElseThrow(() -> new ResourceNotFound("item not found!!" + order)));
		itemQ.setQuantity(newItemQ.getQuantity());
		itemQ = repo.save(itemQ);
		return new ResponseEntity<ItemQuantity>(itemQ,HttpStatus.CREATED);
	}
}
