package com.boc.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boc.models.Transaction;

@Repository
public interface TransactionDAO extends JpaRepository<Transaction, Integer> {

}
