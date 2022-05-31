package com.boc.models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="user_details")
public class UserDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_details_id")
	private int id;
	
	private String email;
	
	@Column(name="first_name")
	private String firstName;
	@Column(name="middle_name")
	private String middleName;
	@Column(name="last_name")
	private String lastName;
	
	private String city;
	
	@Column(name="zip_code")
	private int zipCode;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinColumn(name = "state_id")
	private States state;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinColumn(name = "country_id")
	private Data data;

	public UserDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserDetails(int id, String email, String firstName, String middleName, String lastName, String city,
			int zipCode, States state, Data data) {
		super();
		this.id = id;
		this.email = email;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.city = city;
		this.zipCode = zipCode;
		this.state = state;
		this.data = data;
	}

	public UserDetails(String email, String firstName, String middleName, String lastName, String city, int zipCode,
			States state, Data data) {
		super();
		this.email = email;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.city = city;
		this.zipCode = zipCode;
		this.state = state;
		this.data = data;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getZipCode() {
		return zipCode;
	}

	public void setZipCode(int zipCode) {
		this.zipCode = zipCode;
	}

	public States getState() {
		return state;
	}

	public void setState(States state) {
		this.state = state;
	}

	public Data getCountry() {
		return data;
	}

	public void setCountry(Data data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "UserDetails [id=" + id + ", email=" + email + ", firstName=" + firstName + ", middleName=" + middleName
				+ ", lastName=" + lastName + ", city=" + city + ", zipCode=" + zipCode + ", state=" + state
				+ ", country=" + data + "]";
	}
	
	
}
