package com.boc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boc.daos.AccountTypeDAO;
import com.boc.daos.UserDAO;
import com.boc.models.AccountType;
import com.boc.models.User;

@Service
public class AccountTypeService {
	
	@Autowired
	private AccountTypeDAO acTypeDAO;
	
	@Autowired
	private UserService uService;

	public List<AccountType> getAllAccountType() {
		
		return acTypeDAO.findAll();
		
	}

	public void saveAccountType(AccountType accountType) {
		
		acTypeDAO.save(accountType);
		
	}

//	public AccountType findAccountTypeByUser(String username) {
//		User user = uService.findUserByUsername(username);
//		int userId = user.getId();
//		if(user != null) {
//			AccountType = 
//		}
//		return null;
//	}

	
}
