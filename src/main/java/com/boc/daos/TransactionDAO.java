package com.boc.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boc.models.Transaction;
import com.boc.models.User;

@Repository
public interface TransactionDAO extends JpaRepository<Transaction, Integer> {

	List<Transaction> findTransactionByUser(User user);

}
