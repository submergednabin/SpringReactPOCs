package com.boc.controllers;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import com.boc.daos.CountryDAO;
import com.boc.daos.StateDAO;
import com.boc.models.Data;
import com.boc.models.Datas;
import com.boc.models.States;
import com.boc.services.CountryService;

@RestController
@RequestMapping(value = "/countries")
@CrossOrigin(origins= "http://localhost:3000", allowCredentials = "true")
public class CountryAndStateApiController {
	
	@Autowired
	private RestTemplate restTemplate;
	
	private CountryService countryService;
	
	private CountryDAO countryDAO;
	
	private StateDAO stateDAO;
	
	
	@Autowired
	private CountryAndStateApiController(CountryService countryService, CountryDAO countryDAO, StateDAO stateDAO) {
		super();
		this.countryService = countryService;
		this.countryDAO = countryDAO;
		this.stateDAO = stateDAO;
	}
	
	
	@GetMapping(value = "all")
	public ResponseEntity<List<Data>> getAllCountries(){
		List<Data> datas = countryService.getCountries();
		return ResponseEntity.status(200).body(datas);


	}
	
	
	/**
	 * find states of country
	 */
	@PostMapping(value="state/{countryName}")
	public ResponseEntity<String> getAllStatesByCountry(@PathVariable String countryName){
		
		String url = "https://countriesnow.space/api/v0.1/countries/states";
		System.out.println("Country: " + countryName);
		Data dd = countryDAO.findByName(countryName);

		HttpHeaders header = new HttpHeaders();
		header.add("user-agent", "Application");
		HttpEntity<String> entity = new HttpEntity<>(header);
		Datas data = restTemplate.exchange(url, HttpMethod.GET, entity, Datas.class).getBody();
		
		List<Data> dataList = data.getData();
		dataList.stream().filter(d->dd.getName().equals(d.getName())).findFirst();
		
		Optional<Data> dts = dataList.stream().filter(d->dd.getName().equals(d.getName())).findFirst();	
		
		int id = dd.getId();
		System.out.println("Country Id :" + id);
		List<States> state = dts.get().getStates();
		
		state.forEach(st -> st.setData(dd));
		if(stateDAO.findAllByData(dd).isEmpty()) {
			stateDAO.saveAll(state);
		}else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Already Exists");
			
		}
		
		return ResponseEntity.status(200).body("States of " + countryName + " is saved Successfully");

		
	}
	
	@GetMapping(value="state/{countryName}")
	public ResponseEntity<List<States>> getStatesByCountryName(@PathVariable String countryName){
		List<States> stateList = countryService.getStatesByName(countryName);
		return ResponseEntity.status(200).body(stateList);
	}
	
	
	/*
	 * saving state by country name
	 */
//	@PostMapping(value = "state/{countryName}")
//	public ResponseEntity<String> addAllStateByCountryName(@PathVariable String countryName){
//		String url = "https://countriesnow.space/api/v0.1/countries/states";
//		System.out.println("Country: " + countryName);
//		Data dd = countryDAO.findByName(countryName);
//		HttpHeaders header = new HttpHeaders();
//		header.add("user-agent", "Application");
//		HttpEntity<String> entity = new HttpEntity<>(header);
//		Datas data = restTemplate.exchange(url, HttpMethod.GET, entity, Datas.class).getBody();
//		Optional<Data> dataList = data.getData().stream()
//				.filter(d->dd.getName().equals(d.getName()))
//				.findFirst();
//		dataList.get().getId();
//		List<States> state = dataList.get().getStates();
//	
//		return ResponseEntity.status(200).body("Saved");
//	}
	
	/*
	 * Gettin all the list of country from external Api Countriesnow
	 * @url: https://countriesnow.space/api/v0.1/countries/states
	 */
	@GetMapping(value="all-country")
	public ResponseEntity<Datas> getAllData() {
		String url = "https://countriesnow.space/api/v0.1/countries/states";
		HttpHeaders header = new HttpHeaders();
		header.add("user-agent", "Application");
		HttpEntity<String> entity = new HttpEntity<>(header);
		Datas data = restTemplate.exchange(url, HttpMethod.GET, entity, Datas.class).getBody();
		List<Data> dataList = data.getData();
		Data dd = countryDAO.findByName("Afghanistan");
		List<List<States>> state =  dataList.stream().
				map(s-> s.getStates()).collect(Collectors.toList());

		System.out.println(state);

		return ResponseEntity.status(200).body(data);
	}
	
	/*
	 * Saving all the list of country to database
	 */
	@PostMapping(value ="save-all")
	public ResponseEntity<String> saveAllCountry() {
		String countries = countryService.saveAllCountry();
		return ResponseEntity.status(201).body(countries);
	}
	
	/*
	 * Getting all the name of states from external api Countriesnow
	 * @url: https://countriesnow.space/api/v0.1/countries/states
	 */
	@GetMapping(value = "states")
	public ResponseEntity<Object> getAllStates(){
		String url = "https://countriesnow.space/api/v0.1/countries/states";
		HttpHeaders header = new HttpHeaders();
		header.add("user-agent", "Application");
		HttpEntity<String> entity = new HttpEntity<>(header);
		Object data = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class).getBody();
		String[] locales= Locale.getISOCountries();

		for (String countryCode : locales) {

			Locale obj = new Locale("", countryCode);

			System.out.println("Country Code = " + obj.getCountry() 
				+ ", Country Name = " + obj.getDisplayCountry());
			
			System.out.println("state = " + obj.getCountry() );

		}

		return ResponseEntity.status(200).body(data);
	}
	
//	@GetMapping(value="states/{countryName}")
//	public ResponseEntity<List<States>> getAllStates(@PathParam("countryName") String countryName){
//		return null;
//		
//	}
	

}
