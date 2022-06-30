package com.boc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boc.daos.CountryDAO;
import com.boc.daos.StateDAO;
import com.boc.daos.UserDAO;
import com.boc.daos.UserDetailsDAO;
import com.boc.models.Data;
import com.boc.models.States;
import com.boc.models.User;
import com.boc.models.UserDetails;

@Service
public class UserService {
	
	
	private UserDAO userDAO;
	
	@Autowired
	private UserDetailsDAO userDetails;
	
	@Autowired
	private CountryDAO country;
	
	@Autowired
	private StateDAO stateDAO;
	
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
		UserDetails udetails = user.getUserDetails();
		Data data = udetails.getData();
		States states = udetails.getState();
		country.findByName(data.getName());
		int countryId = 0;
		if(country.findByName(data.getName())!=null) {
			Data cc = country.findByName(data.getName());
			countryId =cc.getId();
			System.out.println("country id: " + countryId);
			
		}else {
			System.out.println("country does not exists in db");
		}
		System.out.println(states.getName());
		String name = states.getName();
//		System.out.println(stateDAO.findByName(name));
		System.out.println(stateDAO.findAll());
//		States st = state.findByName(states.getName());
//		if(st==null) {
//			System.out.println("state by name not found");
//		}else {
//			System.out.println("state by name is found in db");
//		}
//		States sC = state.findByDataId(countryId);
//		if(sC==null) {
//			System.out.println("null state by country id");
//		}else {
//			System.out.println("found state by country Id");
//		}
		
//		userDetails.save(udetails); 
//		System.out.println(userDetails);
//		userDAO.save(user);
		System.out.println(udetails);
		
	}
	
}
