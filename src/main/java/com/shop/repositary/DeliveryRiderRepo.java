package com.shop.repositary;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.shop.model.DeliveryRider;
import com.shop.model.Item;

@Repository
public interface DeliveryRiderRepo extends JpaRepository<DeliveryRider, Integer> {

	Optional<DeliveryRider> findByUsername(String username);
	
	
	
}
