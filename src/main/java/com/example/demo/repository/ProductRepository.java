package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import com.example.demo.model.Product;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{


    // Define the custom query method
    @Query("SELECT p.name FROM Product p")
    List<String> getProductNames();
}
