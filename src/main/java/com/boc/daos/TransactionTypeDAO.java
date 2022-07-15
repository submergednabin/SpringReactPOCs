package com.boc.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boc.models.TransactionType;

@Repository
public interface TransactionTypeDAO extends JpaRepository<TransactionType, Integer> {
	
	public TransactionType findById(int id);

}
