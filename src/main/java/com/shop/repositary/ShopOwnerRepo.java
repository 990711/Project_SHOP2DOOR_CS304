package com.shop.repositary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.model.ShopOwner;

@Repository
public interface ShopOwnerRepo extends JpaRepository<ShopOwner, Long>{

	
	
}
