package com.shop.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.shop.model.ShopOwner_JobPostings;

@Repository
public interface ShopOwner_JobPostingsRepository extends JpaRepository<ShopOwner_JobPostings, Long> {
}


