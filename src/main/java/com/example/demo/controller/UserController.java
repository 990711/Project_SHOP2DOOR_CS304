//package com.example.demo.controller;
//
//import com.example.demo.exception.ResourceNotFoundException;
//import com.example.demo.model.User;
//import com.example.demo.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/v1/")
//public class UserController {
//    @Autowired
//    private UserRepository userRepository;
//
//    @PostMapping("/login")
//    public ResponseEntity<User> login(@RequestBody User userCredentials) {
//        // Retrieve the user by name from the database
//        List<User> allUsers = userRepository.findAll();
//        User matchingUser = null;
//        for (User user : allUsers) {
//            if (user.getname().equals(userCredentials.getname()) && user.getPassword().equals(userCredentials.getPassword())) {
//                matchingUser = user;
//                break;
//            }
//        }
//
//        if (matchingUser != null) {
//            // User found
//            matchingUser.setPassword(null);
//            return ResponseEntity.ok(matchingUser);
//        } else {
//            throw new ResourceNotFoundException("Invalid credentials");
//        }
//    }
//
//    @PostMapping("/signin")
//    public ResponseEntity<User> signIn(@RequestBody User userCredentials) {
//        // Save the user data to the database
//        userRepository.save(userCredentials);
//        // Return a response, e.g., a success message or a token
//        String name = userCredentials.getname();
//        long userId = userCredentials.getUserID();
//
//        User successuser = new User(name);
//        successuser.setUserID(userId);
//
//        return ResponseEntity.ok(successuser);
//    }
//}
