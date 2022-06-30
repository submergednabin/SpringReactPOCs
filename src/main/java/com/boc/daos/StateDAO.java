package com.boc.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boc.models.Data;
import com.boc.models.States;

@Repository
public interface StateDAO extends JpaRepository<States, Integer> {

	public States findByName(String name);
//	public Data findByName(String name);
//	public States findByDataId(int countryId);
	public List<States> findAllByData(Data country);

}
