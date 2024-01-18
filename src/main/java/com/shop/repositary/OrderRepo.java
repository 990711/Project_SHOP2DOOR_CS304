package com.shop.repositary;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.shop.model.Order;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {

	@Query(value = "SELECT order_id FROM cs_304_group_project.orders WHERE action='Confirmed and waiting for a rider'", nativeQuery = true)
	List<Long> viewWaitingOrders();
	
	@Query(value = "SELECT cs_304_group_project.customer.name , cs_304_group_project.customer.address , cs_304_group_project.customer.phone FROM cs_304_group_project.orders JOIN cs_304_group_project.customer ON orders.customer_id = customer.user_id WHERE orders.order_id = :orderId", nativeQuery = true)
	Object viewCustomerDetails(@Param("orderId") long orderId);
	
	@Query(value = "SELECT cs_304_group_project.shop_owner.shop_name,cs_304_group_project.shop_owner.location, cs_304_group_project.shop_owner.branch, cs_304_group_project.shop_owner.contact  FROM cs_304_group_project.shop_owner WHERE user_id IN ( SELECT distinct shop_id FROM cs_304_group_project.item_quantity WHERE order_id=:orderId)", nativeQuery = true)
	List<Object> viewShopDetails(@Param("orderId") long orderId);
	
}
