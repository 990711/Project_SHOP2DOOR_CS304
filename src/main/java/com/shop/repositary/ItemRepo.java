package com.shop.repositary;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.shop.model.Item;

@Repository
public interface ItemRepo extends JpaRepository<Item, Long>{

	List<Item> findAllByCategory(String category);
	
	@Query(value = "SELECT * FROM item WHERE shop_id = :id", nativeQuery = true)
	List<Item> getItemsByShopId(Long id);

}