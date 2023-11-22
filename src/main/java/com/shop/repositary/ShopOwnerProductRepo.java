package com.shop.repositary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.model.ShopOwnerProduct;

@Repository
public interface ShopOwnerProductRepo extends JpaRepository<ShopOwnerProduct, Long>{

}
