package com.boc.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boc.models.Account;
import com.boc.models.AccountType;
import com.boc.models.User;

@Repository
public interface AccountDAO extends JpaRepository<Account, Integer> {
	
	Account findAccountById(int id);
	
	public List<Account> findAllByUser(User u);
	
	

}
