package com.shop.repositary;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.shop.model.ItemQuantity;
import com.shop.model.ItemQuantityKey;

@Repository
public interface ItemQuantityRepo extends JpaRepository<ItemQuantity, ItemQuantityKey> {

	@Query(value = "SELECT item_id,quantity FROM item_quantity WHERE order_id = :id", nativeQuery = true)
    List<Object[]> findItemsByOrderID(@Param("id") long id);
	
}
