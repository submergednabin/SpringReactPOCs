package com.boc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boc.daos.AccountTypeDAO;
import com.boc.models.AccountType;

@Service
public class AccountTypeService {
	
	@Autowired
	private AccountTypeDAO acTypeDAO;

	public List<AccountType> getAllAccountType() {
		
		return acTypeDAO.findAll();
		
	}

	public void saveAccountType(AccountType accountType) {
		
		acTypeDAO.save(accountType);
		
	}

	
}
