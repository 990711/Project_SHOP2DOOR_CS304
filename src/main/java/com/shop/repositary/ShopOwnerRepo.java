package com.shop.repositary;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.shop.model.ShopOwner;

@Repository
public interface ShopOwnerRepo extends JpaRepository<ShopOwner, Integer>{

//	@Query(value = "SELECT shop_name,location,email,branch,contact FROM shop_owner", nativeQuery = true)
//	List<Object> getAllShops();
	
	Optional<ShopOwner> findByUsername(String username);
	
	@Query(value = "SELECT user_id as shop_id,shop_name,location,email,branch,contact FROM shop_owner", nativeQuery = true)
	List<Map<String, Object>> getAllShops();

	@Query(value = "SELECT DISTINCT orders.order_id\r\n"
			+ "FROM orders\r\n"
			+ "INNER JOIN item_quantity ON orders.order_id = item_quantity.order_id\r\n"
			+ "WHERE orders.action = 'Rider accepted' AND item_quantity.shop_id = :shop_id", nativeQuery = true)
	List<Long> getPendingOrders(@Param("shop_id") int user_id);

	@Query(value = "SELECT item_id,quantity FROM cs_304_group_project.item_quantity where order_id=:order_id and shop_id=:shop_id", nativeQuery = true)
	List<Map<String, Object>> getPendingOrdersItems(@Param("shop_id") int user_id,@Param("order_id") Long order_id);
	
	@Query(value = "SELECT DISTINCT orders.order_id\r\n"
			+ "FROM orders\r\n"
			+ "INNER JOIN item_quantity ON orders.order_id = item_quantity.order_id\r\n"
			+ "WHERE orders.action = 'Order Completed' AND item_quantity.shop_id = :shop_id", nativeQuery = true)
	List<Long> getCompletedOrders(@Param("shop_id") int user_id);
	
	@Query(value = "SELECT item_id,quantity FROM cs_304_group_project.item_quantity where order_id=:order_id and shop_id=:shop_id", nativeQuery = true)
	List<Map<String, Object>> getCompletedOrdersItems(@Param("shop_id") int user_id,@Param("order_id") Long order_id);
	
}
