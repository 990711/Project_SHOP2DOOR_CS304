package com.shop.repositary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.model.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role, Integer>{

	
	
}
