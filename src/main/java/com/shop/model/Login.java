package com.shop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Login")
@Inheritance(strategy = InheritanceType.JOINED)
public class Login {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int user_id;

	@NotBlank(message = "this column must be filled!")
	@Column(name = "username")
	private String username;

	@NotBlank(message = "this column must be filled!")
	@Size(min = 8, message = "password must be greater than 8 charactors!")
	@Column(name = "password")
	private String password;



	@NotBlank(message = "must be select!")
	private String Role;
	
	@Column(name = "active")
	private boolean active = true;
	
	@Column(name = "blocked")
	private boolean blocked = false;
	
	@Column(name = "deleted")
	private boolean deleted = false;
	
	public Login() {

	}
	
	

	public Login(@NotBlank(message = "this column must be filled!") String username,
			@NotBlank(message = "this column must be filled!") @Size(min = 8, message = "password must be greater than 8 charactors!") String password,
			@NotBlank(message = "must be select!") String role, boolean active, boolean blocked, boolean deleted) {
		super();
		this.username = username;
		this.password = password;
		Role = role;
		this.active = active;
		this.blocked = blocked;
		this.deleted = deleted;
	}



	public String getRole() {
		return Role;
	}

	public void setRole(String role) {
		Role = role;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean isBlocked() {
		return blocked;
	}

	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	
	
	
	

}
