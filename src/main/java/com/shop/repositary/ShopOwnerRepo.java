package com.shop.repositary;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.shop.model.ShopOwner;

@Repository
public interface ShopOwnerRepo extends JpaRepository<ShopOwner, Long>{

	@Query(value = "SELECT shop_name,location,email,branch,contact FROM shop_owner", nativeQuery = true)
	List<Object> getAllShops();
	
}
