package com.shop.repositary;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.model.FoodSupplier;

@Repository
public interface FoodSupplierRepo extends JpaRepository<FoodSupplier, Integer>{

	Optional<FoodSupplier> findByUsername(String username);
	
}
