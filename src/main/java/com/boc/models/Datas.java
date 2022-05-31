package com.boc.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonUnwrapped;


@JsonIgnoreProperties(ignoreUnknown = true)
public class Datas {
	
	private String error;
	private String msg;

	private List<Data> data;

	public Datas() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Datas(String error, String msg, List<Data> data) {
		super();
		this.error = error;
		this.msg = msg;
		this.data = data;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public List<Data> getData() {
		return data;
	}

	public void setData(List<Data> data) {
		this.data = data;
	}
	
	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((data == null) ? 0 : data.hashCode());
		result = prime * result + ((error == null) ? 0 : error.hashCode());
		result = prime * result + ((msg == null) ? 0 : msg.hashCode());
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
		Datas other = (Datas) obj;
		if (data == null) {
			if (other.data != null)
				return false;
		} else if (!data.equals(other.data))
			return false;
		if (error == null) {
			if (other.error != null)
				return false;
		} else if (!error.equals(other.error))
			return false;
		if (msg == null) {
			if (other.msg != null)
				return false;
		} else if (!msg.equals(other.msg))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Datas [error=" + error + ", msg=" + msg + ", data=" + data + "]";
	}

	
	

}
