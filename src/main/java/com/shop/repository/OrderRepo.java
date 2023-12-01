package com.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.model.Order;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {

}