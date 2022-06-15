package com.boc.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boc.daos.TransactionDAO;
import com.boc.models.Transaction;

@Service
public class TransactionService {
	
	@Autowired
	private TransactionDAO tDAO;
	
	public List<Transaction> listAllTransactions() {
		return tDAO.findAll();
	}

	public Optional<Transaction> checkTransaction(int transactionId) {
		return tDAO.findById(transactionId);
	}

	public Transaction saveTransactions(Transaction transaction) {
		return tDAO.save(transaction);
	}

}
