package com.boc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boc.daos.UserDAO;
import com.boc.models.User;

@Service
public class UserService {
	
	private UserDAO userDAO;
	
	
	@Autowired
	public UserService(UserDAO userDAO) {
		this.userDAO = userDAO;
		
	}

	public List<User> getAllUsers() {
		return userDAO.findAll();
	}

	public User findUserByUsername(String username) {
		return userDAO.findByUsername(username);
	}

	public void addUser(User user) {
		userDAO.save(user);
	}
	
}
