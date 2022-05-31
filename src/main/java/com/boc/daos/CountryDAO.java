package com.boc.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boc.models.Data;

@Repository
public interface CountryDAO extends JpaRepository<Data, Integer> {

	public Data findByName(String name);
}
