package com.boc.services;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.boc.daos.CountryDAO;
import com.boc.models.Data;
import com.boc.models.Datas;

import com.boc.models.States;


@Service
public class CountryService {
	
	@Autowired
	private RestTemplate restTemplate;
	
	
	private CountryDAO countryDAO;
	
	@Autowired
	public CountryService(CountryDAO countryDAO) {
		super();
		this.countryDAO = countryDAO;
		
	}
	
	/*
	 * public CountryService(RestTemplateBuilder restTemplateBuilder) {
	 * this.restTemplate = restTemplateBuilder .basicAuthentication("X-CSCAPI-KEY",
	 * "Sm9aanplZ0dMRWpiT2wxZVZBRldVbnpsQlZSYlFEVGpBOXljNThnVg==") .build(); }
	 */
	
	
	public List<Data> getCountries(){
		
		String url = "https://countriesnow.space/api/v0.1/countries/states";
		Datas listData =  restTemplate.getForObject(url, Datas.class);
		List<Data> an = listData.getData();
		return an;
		
	
	}

	public void addAllCountry() {
		
		String url = "https://countriesnow.space/api/v0.1/countries/states";
		
	}

	public String saveAllCountry() {
		
		String url = "https://countriesnow.space/api/v0.1/countries/states";
		HttpHeaders header = new HttpHeaders();
		header.add("user-agent", "Application");
		HttpEntity<String> entity = new HttpEntity<>(header);
		Datas data = restTemplate.exchange(url, HttpMethod.GET, entity, Datas.class).getBody();

		List<Data> dataList = data.getData();
		
		countryDAO.saveAll(dataList);

		return "saved All";

	}

}
