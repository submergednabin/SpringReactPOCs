package com.boc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boc.models.AuthRequest;
import com.boc.utils.JwtUtil;

@RestController
@RequestMapping(value = "/login")
public class LoginController {

	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@GetMapping
	public ResponseEntity success() {
		return ResponseEntity.ok("Successfully DOne");
	}
	
	@PostMapping
	public ResponseEntity<?> generateToken(@RequestBody AuthRequest authRequest) throws Exception{
		
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
		}catch(BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid Username/password");
		}
		String jwt = jwtUtil.generateToken(authRequest.getUsername());
		return ResponseEntity.status(200).body(jwt);
		
	}
}
