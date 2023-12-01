package com.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.model.ShopOwner;
import com.shop.repository.ShopOwnerRepo;

@Service
public class ShopOwnerService {

	@Autowired
	private ShopOwnerRepo repo;

	public ShopOwner createShopOwner(ShopOwner newShopOwner) {
		return repo.save(newShopOwner);
	}
	
	
}
