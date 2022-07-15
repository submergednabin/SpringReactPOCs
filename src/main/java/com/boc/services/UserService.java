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
		int stateId=0;
		UserDetails ud = new UserDetails();
		Data cc = new Data();
		States st = new States();
		if(country.findByName(data.getName())!=null) {
			 cc = country.findByName(data.getName());
				udetails.setData(cc);
			countryId =cc.getId();
			
		}else {
			System.out.println("country does not exists in db");
		}
		System.out.println(states.getName());
		String name = states.getName();
		if(stateDAO.findByName(states.getName())!=null) {
			st = stateDAO.findByName(states.getName());
			stateId = st.getId();
			udetails.setState(st);
		}
	
//		
//		System.out.println(cc);
		System.out.println(st);
//		System.out.println(udetails)
		
		UserDetails u = userDetails.save(udetails);
		user.setUserDetails(u);
		userDAO.save(user);
			
		}
		
		
	
	
}
