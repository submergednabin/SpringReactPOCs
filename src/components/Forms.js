import React, { useState } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

const url = "http://localhost:8080/boc";
const Forms = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [message] = useState({
    NAME_ERR:
      "Username must be greater than 2 Letter and must not contain special characters",
    PWD_INVALID: "password must be valid / Incorrect",
    USER_INVALID:"User name doesn't exists",
    MANDATORY: "All fields are required",
    SUCCESS: "Successfully Login",
    ERROR: "Username or password incorrect"
  });

  const loginHandler = (e) => {
    e.preventDefault();
    const datas = {
      username: login.username,
      password: login.password
    }
    if(datas.username.trim()==="" && datas.password.trim() === "" ){
      setErrorMessage(message.MANDATORY);
    }else{
      axios.post(`${url}/login`, datas).then(res=>{
        if(res.status===200){
          setErrorMessage("")
          setNameErr("");
          setPasswordErr("")
          setSuccessMessage(message.SUCCESS)
          
        }else{
          setErrorMessage(message.ERROR)
        }
      }).catch(error =>{
        setErrorMessage(message.ERROR)
      });
      
    }


  };

  const validationHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "username":
        if (value.length <= 2) {
          setNameErr("Username must be greater than 2 characters");
        }
        else{
          setLogin({...login, [name]: value})
          setNameErr("")
        }
        break;
      case "password":
        if (value.length <= 3) {
          setPasswordErr("password length must be greater than 3");
        }
        else if (value.length > 20) {
          setPasswordErr("Password cannot exceeed 20 characters");
        }
        else{
          setLogin({...login, [name]: value} )
          setPasswordErr("");
        }
        break;

      default:
        setErrorMessage(message.MANDATORY);
        break;
    }
  };

  return (
    <>
      <Form onSubmit={loginHandler}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label htmlFor="username" column sm={2}>
            User ID
          </Form.Label>
          <Col sm={3}>
            <Form.Control
              type="text"
              name="username"
              onChange={validationHandler}
            />
            <small id="info" className="form-text text-muted">
              Enter your email or username
            </small>
            {nameErr.length > 0 && 
          <Alert as={Row}  variant="danger">
            {nameErr}
          </Alert>}
          </Col>
            
         
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label htmlFor="username" column sm={2}>
            Password
          </Form.Label>
          <Col sm={3}>
            <Form.Control
              name="password"
              onChange={validationHandler}
              type="password"
            />
            {passwordErr.length > 0 && 
          <Alert as={Row}  variant="danger">
            {passwordErr}
          </Alert>}
          </Col>
        </Form.Group>
        <Button size="lg" type="submit" variant="primary" className="mx-4">
          Submit
        </Button>
        
      </Form>
        {errorMessage.length > 0 && 
          <Alert as={Row}  variant="danger">
            {errorMessage}
          </Alert>}
          {successMessage.length > 0 && 
          <Alert as={Row}  variant="success">
            {successMessage}
          </Alert>}
    </>
  );
};

export default Forms;
