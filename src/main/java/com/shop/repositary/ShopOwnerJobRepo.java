package com.shop.repositary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.model.ShopOwnerJob;

@Repository
public interface ShopOwnerJobRepo extends JpaRepository<ShopOwnerJob, Long> {

}

