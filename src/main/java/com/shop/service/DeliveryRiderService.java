package com.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.model.DeliveryRider;
import com.shop.repositary.DeliveryRiderRepo;

@Service
public class DeliveryRiderService {

	@Autowired
	private DeliveryRiderRepo repo;

	public DeliveryRider createDeliveryRider(DeliveryRider newDeliveryRider) {
		return repo.save(newDeliveryRider);
	}
	
	
}
