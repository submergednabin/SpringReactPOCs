package com.boc.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boc.models.User;

@Repository
public interface UserDAO extends JpaRepository<User, Integer> {
	
	public User findByUsername(String username);
	
	public User findById(int userId);

}
