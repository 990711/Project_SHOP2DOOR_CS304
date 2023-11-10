package com.shop.model;

import jakarta.persistence.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Date;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;


@Entity
@Table(name = "shopowner_job_postings")


public class ShopOwner_JobPostings {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jobTitle")
    private String jobTitle;
    
    @Column(name = "description")
    private String description;
    
    @Temporal(TemporalType.DATE) // Add this annotation to store only the date part
    @Column(name = "applicationDeadline")
    private Date applicationDeadline;
    
    @Column(name = "applicationStatus")
    private String applicationStatus;
    

    public ShopOwner_JobPostings() {
        // Default constructor
    }

    public ShopOwner_JobPostings(String jobTitle, String description, Date applicationDeadline, String applicationStatus) {
        this.jobTitle = jobTitle;
        this.description = description;
        this.applicationDeadline = applicationDeadline;
        this.applicationStatus = applicationStatus;
     
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
