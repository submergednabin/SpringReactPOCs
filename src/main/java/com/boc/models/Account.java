package com.boc.models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade=CascadeType.MERGE)
	@JoinColumn(name = "user_id")
	private User user;
	
	@OneToOne(fetch = FetchType.EAGER, cascade=CascadeType.MERGE)
	@JoinColumn(name = "account_type_id")
	private AccountType accountType;
	
	private int total_Amount;
	private String date_created;
	private String date_updated;
	
	
	public Account() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Account(int id, User user, AccountType accountType, int total_Amount, String date_created,
			String date_updated) {
		super();
		this.id = id;
		this.user = user;
		this.accountType = accountType;
		this.total_Amount = total_Amount;
		this.date_created = date_created;
		this.date_updated = date_updated;
	}


	public Account(User user, AccountType accountType, int total_Amount, String date_created, String date_updated) {
		super();
		this.user = user;
		this.accountType = accountType;
		this.total_Amount = total_Amount;
		this.date_created = date_created;
		this.date_updated = date_updated;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public AccountType getAccountType() {
		return accountType;
	}


	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
	}


	public int getTotal_Amount() {
		return total_Amount;
	}


	public void setTotal_Amount(int total_Amount) {
		this.total_Amount = total_Amount;
	}


	public String getDate_created() {
		return date_created;
	}


	public void setDate_created(String date_created) {
		this.date_created = date_created;
	}


	public String getDate_updated() {
		return date_updated;
	}


	public void setDate_updated(String date_updated) {
		this.date_updated = date_updated;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((accountType == null) ? 0 : accountType.hashCode());
		result = prime * result + ((date_created == null) ? 0 : date_created.hashCode());
		result = prime * result + ((date_updated == null) ? 0 : date_updated.hashCode());
		result = prime * result + id;
		result = prime * result + total_Amount;
		result = prime * result + ((user == null) ? 0 : user.hashCode());
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
		Account other = (Account) obj;
		if (accountType == null) {
			if (other.accountType != null)
				return false;
		} else if (!accountType.equals(other.accountType))
			return false;
		if (date_created == null) {
			if (other.date_created != null)
				return false;
		} else if (!date_created.equals(other.date_created))
			return false;
		if (date_updated == null) {
			if (other.date_updated != null)
				return false;
		} else if (!date_updated.equals(other.date_updated))
			return false;
		if (id != other.id)
			return false;
		if (total_Amount != other.total_Amount)
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}


	@Override
	public String toString() {
		return "Account [id=" + id + ", user=" + user + ", accountType=" + accountType + ", total_Amount="
				+ total_Amount + ", date_created=" + date_created + ", date_updated=" + date_updated + "]";
	}
	
	


}
