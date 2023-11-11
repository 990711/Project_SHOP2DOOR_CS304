package com.shop.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.shop.model.ShopOwner_Product;

@Repository
public interface ShopOwner_ProductRepository extends JpaRepository<ShopOwner_Product, Long>{
	
}

