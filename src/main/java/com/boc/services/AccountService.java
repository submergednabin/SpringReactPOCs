package com.boc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boc.daos.AccountDAO;
import com.boc.models.Account;

@Service
public class AccountService {
	
	@Autowired
	private AccountDAO acDAO;

	public List<Account> getAllAccounts() {
		return acDAO.findAll();
	}

	public void addAccount(Account account) {
		
		acDAO.save(account); 
		
	}

}
