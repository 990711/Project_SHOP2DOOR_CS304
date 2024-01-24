package com.shop.repositary;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.shop.model.Item;
import com.shop.model.Login;

@Repository
public interface LoginRepo extends JpaRepository<Login, Integer>{

	Optional<Login> findByUsername(String username);
	
	@Query(value = "SELECT user_id FROM cs_304_group_project.login where username=:username", nativeQuery = true)
	Long getShopIdByUsername(String username);
	
}
