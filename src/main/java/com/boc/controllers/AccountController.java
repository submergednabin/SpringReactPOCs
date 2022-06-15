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
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Optional<Account>> getAccountsById(@PathVariable int id){
		Optional<Account> account = acService.findAccountById(id);
		return ResponseEntity.status(200).body(account);
		
		
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<String> updateAccountByID(@RequestBody Account account, @PathVariable int id) {
		Optional<Account> accountCheck = acService.findAccountById(id);
		if(accountCheck != null) {
			Account ac = acService.updateAccountById(account, id);
			return ResponseEntity.status(200).body("successfully updated");
		}
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Account Doesnot Exists");
		
	}
	
	

}
