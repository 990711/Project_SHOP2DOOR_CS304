package com.shop.model;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "shopowner_job_postings")
public class ShopOwnerJob {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jobTitle")
    private String jobTitle;
    
    @Column(name = "description")
    private String description;
    
    @Temporal(TemporalType.DATE) // Add this annotation to store only the date part , 2023-12-01
    @Column(name = "applicationDeadline")
    private Date applicationDeadline;
    
    @Column(name = "applicationStatus")
    private String applicationStatus;
    
    @Column(name = "applicationPostingDate")
    private String applicationPostingDate;
    
    @JsonIgnore 
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="shop_id")
	private ShopOwner shop;
    
    @ManyToMany(mappedBy="appliedJobs")
	private Set<Customer> candidate = new HashSet<>();
    

    public ShopOwner getShop() {
		return shop;
	}



	public void setShop(ShopOwner shop) {
		this.shop = shop;
	}



	public ShopOwnerJob() {
        // Default constructor
    }

    

    public String getApplicationPostingDate() {
		return applicationPostingDate;
	}



	public void setApplicationPostingDate(String applicationPostingDate) {
		this.applicationPostingDate = applicationPostingDate;
	}



	public Set<Customer> getCandidate() {
		return candidate;
	}



	public void setCandidate(Set<Customer> candidate) {
		this.candidate = candidate;
	}



	public ShopOwnerJob(String jobTitle, String description, Date applicationDeadline, String applicationStatus,
			String applicationPostingDate, ShopOwner shop, Set<Customer> candidate) {
		super();
		this.jobTitle = jobTitle;
		this.description = description;
		this.applicationDeadline = applicationDeadline;
		this.applicationStatus = applicationStatus;
		this.applicationPostingDate = applicationPostingDate;
		this.shop = shop;
		this.candidate = candidate;
	}



	// Getters and setters for the fields


    public long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getApplicationDeadline() {
        return applicationDeadline;
    }

    public void setApplicationDeadline(Date applicationDeadline) {
        this.applicationDeadline = applicationDeadline;
    }

    public String getApplicationStatus() {
        return applicationStatus;
    }

    public void setApplicationStatus(String applicationStatus) {
        this.applicationStatus = applicationStatus;
    }
	
}
