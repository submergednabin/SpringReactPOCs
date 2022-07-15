package com.boc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boc.models.AccountType;
import com.boc.services.AccountTypeService;

@RestController
@RequestMapping(value = "/account/type")
@CrossOrigin(origins= "http://localhost:3000", allowCredentials = "true")
public class AccountTypeController {
	
	@Autowired
	private AccountTypeService acService;
	
	
	@GetMapping
	public ResponseEntity<List<AccountType>> findAllAccountType(){
		
		List<AccountType> acType = acService.getAllAccountType();
		return ResponseEntity.status(200).body(acType);
		
	}	
	
	@PostMapping
	public ResponseEntity InsertAccountType(@RequestBody AccountType accountType){
		acService.saveAccountType(accountType);
		return ResponseEntity.status(201).build();
	}
	
//	
//	@GetMapping(value = "/{username}")
//	public ResponseEntity<AccountType> findAccountTypeOfUser(@PathVariable String username) {
//		AccountType acType = acService.findAccountTypeByUser(username);
//		return ResponseEntity.status(200).body(null);
//	}
	
	
	
	
}
