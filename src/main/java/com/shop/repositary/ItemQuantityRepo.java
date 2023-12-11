package com.shop.repositary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.model.ItemQuantity;
import com.shop.model.ItemQuantityKey;

@Repository
public interface ItemQuantityRepo extends JpaRepository<ItemQuantity, ItemQuantityKey> {

}
