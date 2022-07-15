package com.boc.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boc.models.Data;
import com.boc.models.States;

@Repository
public interface CountryDAO extends JpaRepository<Data, Integer> {

	public Data findByName(String name);

	
}
