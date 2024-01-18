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
import com.shop.model.ItemQuantity;
import com.shop.model.ItemQuantityKey;
import com.shop.model.Order;
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

	@Autowired
	ItemController item;

	@GetMapping("itemquantity")
	public List<ItemQuantity> itemQuantity() {
		return repo.findAll();
	}

	@PostMapping("itemquantity/{order}/{item}")
	public ResponseEntity<ItemQuantity> createItemQuantity(@PathVariable long order, @PathVariable long item,
			@RequestBody ItemQuantity newItemQ) {

		ItemQuantity itemQ = new ItemQuantity();
		ItemQuantityKey key = new ItemQuantityKey();
		key.setItemId(item);
		key.setOrderId(order);
		itemQ.setId(key);
		itemQ.setItem(itemRepo.findById(item).orElseThrow(() -> new ResourceNotFound("item not found!!" + item)));
		itemQ.setOrder(orderRepo.findById(order).orElseThrow(() -> new ResourceNotFound("item not found!!" + order)));
		itemQ.setQuantity(newItemQ.getQuantity());
		itemQ.setShop_id(itemRepo.findById(item)
				.orElseThrow(() -> new ResourceNotFound("item not found with id " + item)).getShopOwner().getUser_id());
		itemQ = repo.save(itemQ);
		
		float total = getOrderTotal(order);
		Order theOrder = orderRepo.findById(order).orElseThrow(() -> new ResourceNotFound("order not found " + order));
		theOrder.setTotal(total);
		orderRepo.save(theOrder);
		
		return new ResponseEntity<ItemQuantity>(itemQ, HttpStatus.CREATED);
	}

	@DeleteMapping("itemquantity")
	public ResponseEntity<String> delete(@RequestBody ItemQuantityKey id) {

		if (!repo.existsById(id)) {
			return ResponseEntity.ok("item does not found!");
		}

		repo.deleteById(id);
		
		float total = getOrderTotal(id.getOrderId());
		Order theOrder = orderRepo.findById(id.getOrderId()).orElseThrow(() -> new ResourceNotFound("order not found " + id.getOrderId()));
		theOrder.setTotal(total);
		orderRepo.save(theOrder);

		return ResponseEntity.ok("item deleted from the cart!");
	}
	
	@PutMapping("itemquantityIncrease")
	public ResponseEntity<String> increaseQuantity(@RequestBody ItemQuantityKey id) {
		ItemQuantity itemQ = repo.findById(id).orElseThrow(() -> new ResourceNotFound("order/item not found " + id));
		itemQ.setQuantity(itemQ.getQuantity()+ 1);
		repo.save(itemQ);
		
		float total = getOrderTotal(id.getOrderId());
		Order theOrder = orderRepo.findById(id.getOrderId()).orElseThrow(() -> new ResourceNotFound("order not found " + id.getOrderId()));
		theOrder.setTotal(total);
		orderRepo.save(theOrder);
		
		return ResponseEntity.ok("Item quantity increased..");
	}
	
	@PutMapping("itemquantityDecrease")
	public ResponseEntity<String> decreaseQuantity(@RequestBody ItemQuantityKey id) {
		ItemQuantity itemQ = repo.findById(id).orElseThrow(() -> new ResourceNotFound("order/item not found " + id));
		itemQ.setQuantity(itemQ.getQuantity()- 1);
		repo.save(itemQ);
		
		float total = getOrderTotal(id.getOrderId());
		Order theOrder = orderRepo.findById(id.getOrderId()).orElseThrow(() -> new ResourceNotFound("order not found " + id.getOrderId()));
		theOrder.setTotal(total);
		orderRepo.save(theOrder);
		
		return ResponseEntity.ok("Item quantity decreased..");
	}

//	@GetMapping("itemquantity/{id}")
//	public List<Object> findItemsByOrderID(@PathVariable long id) {
//		return repo.findItemsByOrderID(id);
//	}

	@GetMapping("itemquantity/{id}")
	public List<Map<String, Object>> findItemsByOrderID(@PathVariable long id) {
		List<Object[]> resultList = repo.findItemsByOrderID(id);
		List<Map<String, Object>> outputList = new ArrayList<>();

		for (Object[] result : resultList) {
			Map<String, Object> resultMap = new HashMap<>();
			resultMap.put("item_id", result[0]);
			resultMap.put("quantity", result[1]);
			// Add more key-value pairs for other columns if needed
			outputList.add(resultMap);
		}

		return outputList;
	}

	@GetMapping("OrderTotal/{id}")
	public float getOrderTotal(@PathVariable long id) {
		float totalBill = 0;
		List<Map<String, Object>> itemList = findItemsByOrderID(id);

		// Iterate through the list of maps
		for (Map<String, Object> itemMap : itemList) {
			// Accessing values using keys
			Object itemId = itemMap.get("item_id");
			Object quantity = itemMap.get("quantity");

			float item_price = item.findItemPriceByItemID(Long.parseLong(itemId.toString()));

			float item_price_total = item_price * Integer.parseInt(quantity.toString());

			totalBill += item_price_total;
		}

		return totalBill;
	}

}
