package com.boc.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boc.models.UserDetails;

@Repository
public interface UserDetailsDAO extends JpaRepository<UserDetails, Integer> {

	public UserDetails findByEmail(String email);

}
