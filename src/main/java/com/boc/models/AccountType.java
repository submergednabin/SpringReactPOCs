package com.boc.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class AccountType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name = "account_type_id")
	private int accountTypeId;
	
	@Column(name = "account_name")
	private String accountName;

	public AccountType() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AccountType(int accountTypeId, String accountName) {
		super();
		this.accountTypeId = accountTypeId;
		this.accountName = accountName;
	}

	public AccountType(String accountName) {
		super();
		this.accountName = accountName;
	}

	public int getAccountTypeId() {
		return accountTypeId;
	}

	public void setAccountTypeId(int accountTypeId) {
		this.accountTypeId = accountTypeId;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((accountName == null) ? 0 : accountName.hashCode());
		result = prime * result + accountTypeId;
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
		AccountType other = (AccountType) obj;
		if (accountName == null) {
			if (other.accountName != null)
				return false;
		} else if (!accountName.equals(other.accountName))
			return false;
		if (accountTypeId != other.accountTypeId)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "AccountType [accountTypeId=" + accountTypeId + ", accountName=" + accountName + "]";
	}
	
	
	

}
