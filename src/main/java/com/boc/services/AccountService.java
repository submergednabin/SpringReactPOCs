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
import com.boc.models.Transaction;
import com.boc.models.TransactionType;
import com.boc.models.User;

@Service
public class AccountService {
	
	@Autowired
	private AccountDAO acDAO;
	
	@Autowired
	private TransactionService tService;
	
	@Autowired
	private TransactionTypeService tTypeService;
	
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private UserService uService;
	
	@Autowired
	private AccountTypeDAO accountTypeDAO;

	public List<Account> getAllAccounts() {
		return acDAO.findAll();
	}

	public String addAccount(Account account) {
		User user = account.getUser();
		AccountType aType = account.getAccountType();
		String username = user.getUsername();
		String accountTypeName = aType.getAccountName();
		User u = userDAO.findByUsername(username);
		List<Account> acCheck = acDAO.findAllByUser(u);
		
		System.out.println("check" + acCheck.size());
		boolean check = acCheck.stream().anyMatch(o -> o.getAccountType().getAccountName().equals(accountTypeName) );
		System.out.println("Account Name " + accountTypeName + " is " + check );
		
		/*
		 * checking account with duplicate account type of one user exists or not
		 * if true we are not saving it to database
		 * if false only we are saving 
		 */
		if(check == false) {
			
			AccountType acType = accountTypeDAO.findByAccountName(accountTypeName);
			account.setUser(u);
			account.setAccountType(acType);
			System.out.println(account);
			acDAO.save(account); 
			return "saved";
		}else {
			return "User already has " + accountTypeName + ". Create New Account/ Start Transaction ";
		}
	
	}
	
	
	
	/*
	 * check Duplicate accountType of User
	 */
	
//	
//	public String checkDuplicateAccountType(int accountTypeId, String username) {
//		User u = uService.findUserByUsername(username);
//		if(u != null) {
//			Account acCheck = acDAO.find
//		}
//		return null
//	}

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

	public Account findAccount(int accountId) {
		
		return acDAO.findAccountById(accountId);
	}

	
	public String updateAccountDetailsByaccountId(Account account, Transaction transaction) {
		int accountId = account.getId();
		Account ac = transaction.getAccount();
		TransactionType type = transaction.getTransactionType();
		System.out.println(type.getId());
		int amountSubmitted = transaction.getTransactionAmount();
		int currentAmountInAccount = account.getTotal_Amount();
		int totalAmount= 0;
		TransactionType checkTransaction = tTypeService.findTransactionById(type.getId());
		if(checkTransaction != null) {
			String transactionTypeName = checkTransaction.getTransactionType();
			if(transactionTypeName.equals("Withdraw") && (currentAmountInAccount  > amountSubmitted )) {
				totalAmount = currentAmountInAccount - amountSubmitted;
				account.setTotal_Amount(totalAmount);
			}
			else if(transactionTypeName.equals("Deposit")) {
				System.out.println("deopsited");
				totalAmount = currentAmountInAccount + amountSubmitted;
				account.setTotal_Amount(totalAmount);
			} else {
				return "Withdraw need to be smaller than Balance Amount";
			}
			Account saveAcc = acDAO.save(account);
			User user = uService.findUserByUsername(transaction.getUser().getUsername());
			transaction.setUser(user);
			transaction.setAccount(saveAcc);
			transaction.setTransactionAmount(transaction.getTransactionAmount());
			transaction.setTransactionDate(transaction.getTransactionDate());
			transaction.setTransactionType(checkTransaction);
			tService.saveTransactions(transaction);
			
			
		}
		return "successfully updated";
		
	}




}
