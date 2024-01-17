package com.shop.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
import com.shop.model.Customer;
import com.shop.model.Item;
import com.shop.model.Order;
import com.shop.repositary.CustomerRepo;
import com.shop.repositary.DeliveryRiderRepo;
import com.shop.repositary.ItemQuantityRepo;
import com.shop.repositary.ItemRepo;
import com.shop.repositary.OrderRepo;

@RestController
@RequestMapping("/api/v1/")
public class OrderController {

	@Autowired
	private OrderRepo repo;

	@Autowired
	private CustomerRepo customerRepo;

	@Autowired
	private DeliveryRiderRepo riderRepo;
	
	@Autowired
	private ItemQuantityRepo itemQuantityRepo;
	

	@Autowired
	private ItemRepo itemRepo;
	
	@GetMapping("order")
	public List<Order> getOrders() {
		return repo.findAll();
	}

	@PostMapping("order/{username}")
	public ResponseEntity<Order> createOrder(@PathVariable String username, @RequestBody Order newOrder) {

		Customer thecustomer = customerRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFound("customer not found!" + username));
		Order order = newOrder;
		order.setCustomer(thecustomer);
		order.setAction("Shopping cart stage");
		order = repo.save(order);
		return new ResponseEntity<Order>(order, HttpStatus.CREATED);
	}

	@PutMapping("orderRider/{order}/{rider}")
	public ResponseEntity<String> addRider(@PathVariable long order, @PathVariable String rider) {

		Order theOrder = repo.findById(order).orElseThrow(() -> new ResourceNotFound("order not found " + order));
		theOrder.setRider(
				riderRepo.findByUsername(rider).orElseThrow(() -> new ResourceNotFound("rider not found " + rider)));
		theOrder = repo.save(theOrder);
		return ResponseEntity.ok("Rider accepted!");
	}

	@DeleteMapping("orderdelete/{id}")
	public ResponseEntity<String> deleteOrder(@PathVariable long id) {

		if (!repo.existsById(id)) {
			return ResponseEntity.ok("order not found with id " + id);
		}

		Order order = repo.findById(id).orElseThrow();

		order.setDeleted(true);
		order = repo.save(order);

		return ResponseEntity.ok("Order deleted with id " + id);
	}
	
	

	@PutMapping("orderStatus/{id}")
	public ResponseEntity<Order> updateAction(@PathVariable long id, @RequestBody Order order) {

		Order existingOrder = repo.findById(id).orElseThrow(() -> new ResourceNotFound("order not found " + id));
		existingOrder.setAction(order.getAction());
		existingOrder = repo.save(existingOrder);
		return new ResponseEntity<Order>(existingOrder, HttpStatus.CREATED);
	}
	
	@PutMapping("orderAction/{id}")
	public ResponseEntity<Order> updateActionByString(@PathVariable long id, @RequestBody String action) {

		Order existingOrder = repo.findById(id).orElseThrow(() -> new ResourceNotFound("order not found " + id));
		existingOrder.setAction(action);
		existingOrder = repo.save(existingOrder);
		return new ResponseEntity<Order>(existingOrder, HttpStatus.CREATED);
	}
	
	@PutMapping("orderConfirm/{id}")
	public ResponseEntity<Order> confirmOrder(@PathVariable long id){
		
		LocalDate currentDate = LocalDate.now();
		LocalTime currentTime = LocalTime.now();
		
		Order existingOrder = repo.findById(id).orElseThrow(() -> new ResourceNotFound("order not found " + id));
		existingOrder.setAction("Confirmed order");
		existingOrder.setTotal(existingOrder.getTotal()+200); // fixed delivery charge = 200
		existingOrder.setDate(currentDate);
		existingOrder.setTime(currentTime);
		
		repo.save(existingOrder);
		
		List<Object[]> itemList = itemQuantityRepo.findItemsByOrderID(id);

		// Iterate through the list of maps
		for (Object[] itemMap : itemList) {
			// Accessing values using keys
			long itemId = (long) itemMap[0];
			int quantity = (int) itemMap[1];

			//int item_stock = itemRepo.getItemQuantityByItemId(itemId);
			
			Item item = itemRepo.findById(itemId)
	                .orElseThrow(() -> new ResourceNotFound("Item not found with id: " + id));
			
			item.setQuantity(item.getQuantity()-quantity);
			itemRepo.save(item);

			
		}
		
		return new ResponseEntity<Order>(existingOrder,HttpStatus.CREATED);
	}
}
