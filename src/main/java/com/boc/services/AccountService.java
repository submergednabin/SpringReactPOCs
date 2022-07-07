package com.boc.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boc.daos.AccountDAO;
import com.boc.daos.AccountTypeDAO;
import com.boc.daos.UserDAO;
import com.boc.models.Account;
import com.boc.models.AccountType;
import com.boc.models.Data;
import com.boc.models.States;
import com.boc.models.User;

@Service
public class AccountService {
	
	@Autowired
	private AccountDAO acDAO;
	
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private AccountTypeDAO accountTypeDAO;

	public List<Account> getAllAccounts() {
		return acDAO.findAll();
	}

	public void addAccount(Account account) {
		User user = account.getUser();
		AccountType aType = account.getAccountType();
		String username = user.getUsername();
		String accountTypeName = aType.getAccountName();
		User u = userDAO.findByUsername(username);
		AccountType acType = accountTypeDAO.findByAccountName(accountTypeName);
		account.setUser(u);
		account.setAccountType(acType);
//		AccountType acType = accountTypeDAO.findByAccount();
		System.out.println(account);
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

	public List<Account> findAccountByUserId(int userId) {
		User u = userDAO.findById(userId);
		
		List<Account> accounts = acDAO.findAllByUser(u);
		return accounts;
	}

	public List<Account> findAccountByUsername(String username) {
		User user = userDAO.findByUsername(username);
		System.out.println(user);
//		System.out.println(username);
		List<Account> accounts = acDAO.findAllByUser(user);
		return accounts;
//		return null;
	}
	


}
