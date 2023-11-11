//package com.example.demo.model;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "Users")
//public class User {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long userID;
//
//    @Column(name = "name")
//    private String name;
//    @Column(name = "Password")
//    private String password;
//    @Column(name = "MobileNo")
//    private String mobileNo;
//
//    public User() {
//    }
//
//    public User(String name, String password) {
//        this.name = name;
//        this.password = password;
//    }
//
//    public User(String name) {
//        this.name = name;
//    }
//
//    public User(long userID, String name, String password, String mobileNo) {
//        this.userID = userID;
//        this.name = name;
//        this.password = password;
//        this.mobileNo = mobileNo;
//    }
//
//    public String getname() {
//        return name;
//    }
//
//    public void setname(String name) {
//        this.name = name;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public long getUserID() {
//        return userID;
//    }
//
//    public void setUserID(long userID) {
//        this.userID = userID;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//}
