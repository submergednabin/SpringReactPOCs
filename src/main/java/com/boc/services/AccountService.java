package com.boc.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boc.daos.AccountDAO;
import com.boc.models.Account;
import com.boc.models.AccountType;

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

	public Optional<Account> findAccountById(int id) {
		Optional<Account> account =  acDAO.findById(id);
		return account;
	}

	public Account updateAccountById(Account account, int id) {
		Account acCheck = acDAO.findAccountById(id);
		acCheck.setAccountType(account.getAccountType());
		AccountType type = account.getAccountType();
		System.out.println(type.getAccountTypeId());
		acCheck.setDate_updated(account.getDate_updated());
		acCheck.setTotal_Amount(account.getTotal_Amount());
		acCheck.setUser(account.getUser());
		return acDAO.save(acCheck);
		
		
	}

}
