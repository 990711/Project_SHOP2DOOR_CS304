package com.shop.repositary;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.shop.model.Login;

@Repository
public interface LoginRepo extends JpaRepository<Login, Integer>{

	
	
}
