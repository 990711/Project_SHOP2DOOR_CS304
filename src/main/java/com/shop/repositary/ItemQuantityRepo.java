package com.shop.repositary;

import java.util.List;
import java.util.Map;

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

	@Query(value = "SELECT iq.order_id,iq.quantity,itm.name,itm.brand,dr.name FROM shop.item_quantity iq INNER JOIN shop.item itm ON iq.shop_id = itm.shop_id  INNER JOIN shop.orders odr ON iq.order_id = odr.order_id INNER JOIN shop.delivery_rider dr ON odr.delivery_id = dr.user_id WHERE iq.shop_id = :id AND odr.action = \"Rider accepted\"", nativeQuery = true)
	List<Map<String, Object>> findItemsByShopOwnerID(@Param("id") int id);
}
