package com.boc.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Table(name = "country")
public class Data {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "country_id")
	private int id;
	
	
	private String name;
		
	//This column iso3 is the column for country code from API data
	private String iso3;
	
	@Transient
	private List<States> states;

	public Data() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Data(int id, String name, String iso3, List<States> states) {
		super();
		this.id = id;
		this.name = name;
		this.iso3 = iso3;
		this.states = states;
	}

	public Data(String name, String iso3, List<States> states) {
		super();
		this.name = name;
		this.iso3 = iso3;
		this.states = states;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIso3() {
		return iso3;
	}

	public void setIso3(String iso3) {
		this.iso3 = iso3;
	}

	public List<States> getStates() {
		return states;
	}

	public void setStates(List<States> states) {
		this.states = states;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		result = prime * result + ((iso3 == null) ? 0 : iso3.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((states == null) ? 0 : states.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Data other = (Data) obj;
		if (id != other.id)
			return false;
		if (iso3 == null) {
			if (other.iso3 != null)
				return false;
		} else if (!iso3.equals(other.iso3))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (states == null) {
			if (other.states != null)
				return false;
		} else if (!states.equals(other.states))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Data [id=" + id + ", name=" + name + ", iso3=" + iso3 + ", states=" + states + "]";
	}

	
	

	
	
}
