package com.shop.repositary;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.shop.model.ShopOwnerJob;

@Repository
public interface ShopOwnerJobRepo extends JpaRepository<ShopOwnerJob, Long> {

	@Query(value = "SELECT * FROM shopowner_job_postings WHERE shop_id = :id", nativeQuery = true)
	List<ShopOwnerJob> getJobsByShopId(Long id);
	
	@Query(value = "SELECT * FROM cs_304_group_project.shopowner_job_postings WHERE application_status = \"open\" OR application_status=\"reopen\"", nativeQuery = true)
	Set<ShopOwnerJob> getOpenJobs();
	
	@Query(value = "SELECT * FROM cs_304_group_project.shopowner_job_postings WHERE application_status = \"close\"", nativeQuery = true)
	Set<ShopOwnerJob> getCloseJobs();
}

