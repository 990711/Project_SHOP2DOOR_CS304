package com.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.model.Item;

@Repository
public interface ItemRepo extends JpaRepository<Item, Long>{

	List<Item> findAllByCategory(String category);

}
