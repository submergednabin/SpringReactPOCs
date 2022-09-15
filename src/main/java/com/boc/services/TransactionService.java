package com.boc.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boc.daos.TransactionDAO;
import com.boc.daos.UserDAO;
import com.boc.models.Transaction;
import com.boc.models.User;

@Service
public class TransactionService {
	
	@Autowired
	private TransactionDAO tDAO;
	
	@Autowired
	private UserDAO uDAO;
	
	public List<Transaction> listAllTransactions() {
		return tDAO.findAll();
	}

	public Optional<Transaction> checkTransaction(int transactionId) {
		return tDAO.findById(transactionId);
	}

	public Transaction saveTransactions(Transaction transaction) {
		return tDAO.save(transaction);
	}

	public List<Transaction> getAllTransactionByUserId(String username) {
		/* check user exist or not */
		User user = uDAO.findByUsername(username);
		if(user !=null) {
			List<Transaction> transactions = tDAO.findTransactionByUser(user);
			return transactions;
		}
		else {
			return null;
		}
	}

}
