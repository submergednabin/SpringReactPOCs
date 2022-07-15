package com.boc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boc.models.User;
import com.boc.services.UserService;

@RestController
@RequestMapping(value= "/user")
@CrossOrigin(origins= "http://localhost:3000", allowCredentials = "true")
public class UserController {
	
	private UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}
	
	@GetMapping
	public ResponseEntity<List<User>> getAllUsers(){
		List<User> users = userService.getAllUsers();
		return ResponseEntity.status(200).body(users);
	}
	
	@PostMapping
	public ResponseEntity addUser(@RequestBody User user) {
		System.out.println(user);
		String username = user.getUsername();
		if(userService.findUserByUsername(username) != null) {
			System.out.println();
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Username Already Exists");
		}else {
			userService.addUser(user);
			return ResponseEntity.status(201).build();
		}
		
	}
	
	
	@GetMapping(value = "valid/{username}")
	public ResponseEntity<Boolean> isValidUserByUsername(@PathVariable String username){
		User user = userService.findUserByUsername(username);
		if(user ==null) {
			return ResponseEntity.status(200).body(false);
		}else {
			return ResponseEntity.status(200).body(true);
		}
	}

}
