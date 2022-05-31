package com.boc.models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table
@JsonIgnoreProperties(ignoreUnknown = true)
public class States {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;
	
	private String state_code;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "country_id")
	private Data data;

	public States() {
		super();
		// TODO Auto-generated constructor stub
	}

	public States(int id, String name, String state_code, Data data) {
		super();
		this.id = id;
		this.name = name;
		this.state_code = state_code;
		this.data = data;
	}

	public States(String name, String state_code, Data data) {
		super();
		this.name = name;
		this.state_code = state_code;
		this.data = data;
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

	public String getState_code() {
		return state_code;
	}

	public void setState_code(String state_code) {
		this.state_code = state_code;
	}

	public Data getData() {
		return data;
	}

	public void setData(Data data) {
		this.data = data;
	}
	
	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((data == null) ? 0 : data.hashCode());
		result = prime * result + id;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((state_code == null) ? 0 : state_code.hashCode());
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
		States other = (States) obj;
		if (data == null) {
			if (other.data != null)
				return false;
		} else if (!data.equals(other.data))
			return false;
		if (id != other.id)
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (state_code == null) {
			if (other.state_code != null)
				return false;
		} else if (!state_code.equals(other.state_code))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "States [id=" + id + ", name=" + name + ", state_code=" + state_code + ", data=" + data + "]";
	}

	
	
}
