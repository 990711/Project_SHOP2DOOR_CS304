package com.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.model.Login;
import com.shop.repository.LoginRepo;

@Service
public class LoginService {

	@Autowired
	private LoginRepo repo;

	public Login createLogin(Login newLogin) {
		return repo.save(newLogin);
	}
}