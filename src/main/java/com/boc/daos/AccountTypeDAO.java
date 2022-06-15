package com.boc.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boc.models.AccountType;

@Repository
public interface AccountTypeDAO extends JpaRepository<AccountType, Integer> {

	

}
