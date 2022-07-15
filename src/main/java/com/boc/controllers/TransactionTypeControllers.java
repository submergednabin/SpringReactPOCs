package com.boc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boc.models.TransactionType;
import com.boc.services.TransactionTypeService;

@RestController
@RequestMapping(value = "/transaction-type")
@CrossOrigin(origins= "http://localhost:3000", allowCredentials = "true")
public class TransactionTypeControllers {
	
	@Autowired
	private TransactionTypeService tService;
	
	@GetMapping
	public ResponseEntity<List<TransactionType>> getAllTransactionTypes(){
		List<TransactionType> tType = tService.getAllTransactionTypes(); 
		
		return ResponseEntity.status(200).body(tType);
	}

}
