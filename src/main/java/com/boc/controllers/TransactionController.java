package com.boc.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boc.models.Transaction;
import com.boc.services.TransactionService;

@RestController
@RequestMapping(value = "/transaction")
@CrossOrigin(origins= "http://localhost:3000", allowCredentials = "true")
public class TransactionController {

	@Autowired
	private TransactionService ts;
	
	@GetMapping
	public ResponseEntity<List<Transaction>> getAllTransactions(){
		
		List<Transaction> transaction = ts.listAllTransactions();
		return ResponseEntity.status(200).body(transaction);
	}
	
	@PostMapping
	public ResponseEntity<?> insertTransaction(@RequestBody Transaction transaction){
		Optional<Transaction> checkTransaction = ts.checkTransaction(transaction.getTransactionId());
		if(checkTransaction != null) {
			Transaction tsave=  ts.saveTransactions(transaction);
			return ResponseEntity.status(201).body(tsave);
		}
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Transaction already exists..cannot insert transaction");
	}
	
	/*
	 * Listing all the transaction of certain user only by dateCreated
	 */
	
	@GetMapping(value = "/user/{username}")
	public ResponseEntity<List<Transaction>> allTransactionOfUser(@PathVariable String username){
		List<Transaction> transaction = ts.getAllTransactionByUserId(username);
		return ResponseEntity.status(200).body(transaction);
	} 
	
	
}
