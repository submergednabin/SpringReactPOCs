import React, { useState } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";

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
    PASSWORD_ERR: "password must be valid",
    MANDATORY: "All fields are required",
  });

  const loginHandler = (e) => {
    e.preventDefault();
    alert("login handler");
  };

  const validationHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "username":
        if (value.length <= 2) {
          setErrorMessage("Username must be greater than 2 characters");
        }
        break;
      case "password":
        if (value.length <= 3) {
          setErrorMessage("password length must be greater than 3");
        }
        if (value.length > 20) {
          setErrorMessage("Password cannot exceeed 20 characters");
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
          </Col>
            {errorMessage.length > 0 && 
          <Alert as={Row} column sm={2} variant="danger">
            <p>{errorMessage}</p>
          </Alert>}
         
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
          </Col>
        </Form.Group>
        <Button size="lg" type="submit" variant="primary" className="mx-4">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Forms;
