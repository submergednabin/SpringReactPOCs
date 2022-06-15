package com.boc.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boc.models.Account;

@Repository
public interface AccountDAO extends JpaRepository<Account, Integer> {
	
	Account findAccountById(int id);

}
