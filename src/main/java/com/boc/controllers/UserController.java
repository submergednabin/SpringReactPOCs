package com.boc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boc.models.User;
import com.boc.services.UserService;

@RestController
@RequestMapping(value= "/user")
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
		String username = user.getUsername();
		if(userService.findUserByUsername(username) != null) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Username Already Exists");
		}else {
			userService.addUser(user);
			return ResponseEntity.status(201).build();
		}
		
	}

}
