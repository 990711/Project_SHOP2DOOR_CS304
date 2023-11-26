package com.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.model.Restaurant;
import com.shop.repositary.RestaurantRepo;

@Service
public class RestaurantService {

	@Autowired
	private RestaurantRepo repo;

	public Restaurant createRestaurant(Restaurant newRestaurant) {
		return repo.save(newRestaurant);
	}
	
}
