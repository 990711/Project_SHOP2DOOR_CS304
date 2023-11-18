package com.shop.repositary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.model.DeliveryRider;

@Repository
public interface DeliveryRiderRepo extends JpaRepository<DeliveryRider, Integer>{

}
