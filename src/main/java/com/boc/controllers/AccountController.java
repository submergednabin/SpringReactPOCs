package com.boc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boc.models.Account;
import com.boc.services.AccountService;

@RestController
@RequestMapping(value = "/account")
@CrossOrigin(origins= "http://localhost:3000", allowCredentials = "true")
public class AccountController {
	
	@Autowired
	private AccountService acService;
	
	
	@GetMapping
	public ResponseEntity<List<Account>> getAllAccounts(){
		
		List<Account> accounts = acService.getAllAccounts();
		return ResponseEntity.status(200).body(accounts);
	}
	
	@PostMapping
	public ResponseEntity addAccount(@RequestBody Account account) {
		
		acService.addAccount(account);
		return ResponseEntity.status(201).build();
		
	}
	
	

}
