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
@Table
public class Transaction {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int transactionId;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "account_id")
	private Account account;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinColumn(name = "transaction_type_id")
	private TransactionType transactionType;
	
	private int transactionAmount;
	
	@Column(name = "transaction_status")
	private String transactionStatus;
	
	private String description;
	
	@Column(name="transaction_date")
	private String transactionDate;
	
	@Column(name = "transaction_update_date")
	private String transactionUpdatedDate;

	
	public Transaction() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Transaction(int transactionId, User user, Account account, TransactionType transactionType,
			int transactionAmount, String transactionStatus, String description, String transactionDate,
			String transactionUpdatedDate) {
		super();
		this.transactionId = transactionId;
		this.user = user;
		this.account = account;
		this.transactionType = transactionType;
		this.transactionAmount = transactionAmount;
		this.transactionStatus = transactionStatus;
		this.description = description;
		this.transactionDate = transactionDate;
		this.transactionUpdatedDate = transactionUpdatedDate;
	}


	public Transaction(User user, Account account, TransactionType transactionType, int transactionAmount,
			String transactionStatus, String description, String transactionDate, String transactionUpdatedDate) {
		super();
		this.user = user;
		this.account = account;
		this.transactionType = transactionType;
		this.transactionAmount = transactionAmount;
		this.transactionStatus = transactionStatus;
		this.description = description;
		this.transactionDate = transactionDate;
		this.transactionUpdatedDate = transactionUpdatedDate;
	}


	public int getTransactionId() {
		return transactionId;
	}


	public void setTransactionId(int transactionId) {
		this.transactionId = transactionId;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public Account getAccount() {
		return account;
	}


	public void setAccount(Account account) {
		this.account = account;
	}


	public TransactionType getTransactionType() {
		return transactionType;
	}


	public void setTransactionType(TransactionType transactionType) {
		this.transactionType = transactionType;
	}


	public int getTransactionAmount() {
		return transactionAmount;
	}


	public void setTransactionAmount(int transactionAmount) {
		this.transactionAmount = transactionAmount;
	}


	public String getTransactionStatus() {
		return transactionStatus;
	}


	public void setTransactionStatus(String transactionStatus) {
		this.transactionStatus = transactionStatus;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getTransactionDate() {
		return transactionDate;
	}


	public void setTransactionDate(String transactionDate) {
		this.transactionDate = transactionDate;
	}


	public String getTransactionUpdatedDate() {
		return transactionUpdatedDate;
	}


	public void setTransactionUpdatedDate(String transactionUpdatedDate) {
		this.transactionUpdatedDate = transactionUpdatedDate;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((account == null) ? 0 : account.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + transactionAmount;
		result = prime * result + ((transactionDate == null) ? 0 : transactionDate.hashCode());
		result = prime * result + transactionId;
		result = prime * result + ((transactionStatus == null) ? 0 : transactionStatus.hashCode());
		result = prime * result + ((transactionType == null) ? 0 : transactionType.hashCode());
		result = prime * result + ((transactionUpdatedDate == null) ? 0 : transactionUpdatedDate.hashCode());
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
		Transaction other = (Transaction) obj;
		if (account == null) {
			if (other.account != null)
				return false;
		} else if (!account.equals(other.account))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (transactionAmount != other.transactionAmount)
			return false;
		if (transactionDate == null) {
			if (other.transactionDate != null)
				return false;
		} else if (!transactionDate.equals(other.transactionDate))
			return false;
		if (transactionId != other.transactionId)
			return false;
		if (transactionStatus == null) {
			if (other.transactionStatus != null)
				return false;
		} else if (!transactionStatus.equals(other.transactionStatus))
			return false;
		if (transactionType == null) {
			if (other.transactionType != null)
				return false;
		} else if (!transactionType.equals(other.transactionType))
			return false;
		if (transactionUpdatedDate == null) {
			if (other.transactionUpdatedDate != null)
				return false;
		} else if (!transactionUpdatedDate.equals(other.transactionUpdatedDate))
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
		return "Transaction [transactionId=" + transactionId + ", user=" + user + ", account=" + account
				+ ", transactionType=" + transactionType + ", transactionAmount=" + transactionAmount
				+ ", transactionStatus=" + transactionStatus + ", description=" + description + ", transactionDate="
				+ transactionDate + ", transactionUpdatedDate=" + transactionUpdatedDate + "]";
	}
	
	
	
	
}
