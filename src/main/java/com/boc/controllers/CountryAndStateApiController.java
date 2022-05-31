package com.boc.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
import com.fasterxml.jackson.core.JsonProcessingException;

@RestController
@RequestMapping(value = "/countries")
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
		List<Data> data = countryService.getCountries();
		return ResponseEntity.status(200).body(data);

	}
	
	@GetMapping(value = "country-list")
	public List<Object> getCountries(){

		String url = "https://countriesnow.space/api/v0.1/countries/states";
		System.out.println("start-list");
		Object[] countries = restTemplate.getForObject(url, Object[].class);
        List<Object> objects = new ArrayList<Object>();
		System.out.println("end list");
		return Arrays.asList(objects);
	}
	
	/**
	 * find states of country
	 */
	@GetMapping(value="state/{countryName}")
	public ResponseEntity<List<States>> getAllStatesByCountry(@PathVariable String countryName){
		
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
		
		stateDAO.saveAll(state);
		
		return ResponseEntity.status(200).body(state);

		
	}
	
	@PostMapping(value = "state/{countryName}")
	public ResponseEntity<String> addAllStateByCountryName(@PathVariable String countryName){
		String url = "https://countriesnow.space/api/v0.1/countries/states";
		System.out.println("Country: " + countryName);
		Data dd = countryDAO.findByName(countryName);
		HttpHeaders header = new HttpHeaders();
		header.add("user-agent", "Application");
		HttpEntity<String> entity = new HttpEntity<>(header);
		Datas data = restTemplate.exchange(url, HttpMethod.GET, entity, Datas.class).getBody();
		Optional<Data> dataList = data.getData().stream()
				.filter(d->dd.getName().equals(d.getName()))
				.findFirst();
		dataList.get().getId();
		List<States> state = dataList.get().getStates();
		
//		dataList.stream()
//		.filter(ds -> dd.getName().equals(ds.getName()))
//		.flatMap(ds -> Stream.of(ds.getStates()));


//		stateDAO.saveAll(dataList);
		return ResponseEntity.status(200).body("Saved");
	}
	
	@GetMapping(value="all-country")
	public ResponseEntity<Datas> getAllData() {
		String url = "https://countriesnow.space/api/v0.1/countries/states";
		HttpHeaders header = new HttpHeaders();
		header.add("user-agent", "Application");
		HttpEntity<String> entity = new HttpEntity<>(header);
		Datas data = restTemplate.exchange(url, HttpMethod.GET, entity, Datas.class).getBody();
		List<Data> dataList = data.getData();
		Data dd = countryDAO.findByName("Afghanistan");
//		System.out.println(dd.getName());
		List<List<States>> state =  dataList.stream().
				map(s-> s.getStates()).collect(Collectors.toList());
//		States st = (States) state;
		System.out.println(state);
		
		
//		sts.setStates(state);
//		Optional<Data> d = Optional.ofNullable(dataList.stream().filter(dt ->dd.getName().equals(dt.getName()) )
//		.findAny()
//		.orElse(null));
		/*
		 * dataList.stream().filter(ds -> dd.getName().equals(ds.getName())) .flatMap(ds
		 * -> Stream.of(ds.getStates())).forEach(System.out::println);
		 */
//		System.out.println(d.stream().flatMap(dds-> Stream.of(dds.getStates())).forEach(System.out::println));
//		System.out.println(dd.getStates());
		return ResponseEntity.status(200).body(data);
	}
	
	@PostMapping(value ="save-all")
	public ResponseEntity<String> saveAllCountry() {
		String countries = countryService.saveAllCountry();
		return ResponseEntity.status(201).body(countries);
	}
	
	@GetMapping(value = "states")
	public ResponseEntity<Object> getAllStates(){
		String url = "https://countriesnow.space/api/v0.1/countries/states";
		HttpHeaders header = new HttpHeaders();
		header.add("user-agent", "Application");
		HttpEntity<String> entity = new HttpEntity<>(header);
		Object data = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class).getBody();
//		List<States> states = new ArrayList<>();
		String[] locales= Locale.getISOCountries();
//		Datas datas = (Datas) countryDAO.findAll();
//		System.out.println(datas.getMsg());
//		System.out.println(countryDAO.findAll());
		for (String countryCode : locales) {

			Locale obj = new Locale("", countryCode);

			System.out.println("Country Code = " + obj.getCountry() 
				+ ", Country Name = " + obj.getDisplayCountry());
			
			System.out.println("state = " + obj.getCountry() );

		}
//		System.out.println(Arrays.asList(data));
		return ResponseEntity.status(200).body(data);
	}
	
	@GetMapping(value="states/{countryName}")
	public ResponseEntity<List<States>> getAllStates(@PathParam("countryName") String countryName){
		return null;
		
	}
	

}
