package com.boc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boc.daos.TransactionTypeDAO;
import com.boc.models.TransactionType;

@Service
public class TransactionTypeService {

	@Autowired
	private TransactionTypeDAO tDAO;
	
	public List<TransactionType> getAllTransactionTypes() {
		return tDAO.findAll();
	}
	
	public TransactionType findTransactionById(int id) {
		
		return tDAO.findById(id);
	}

}
