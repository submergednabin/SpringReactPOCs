import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { loginActions } from "../store/login-slice";
import InputForm from "../layout/InputForm";
import Buttons from "../layout/Buttons";

const url = "http://localhost:8080/boc";
const Forms = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const checkLogin = useSelector((state) => state.login);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [message] = useState({
    NAME_ERR:
      "Username must be greater than 2 Letter and must not contain special characters",
    PWD_INVALID: "password must be valid / Incorrect",
    USER_INVALID: "User name doesn't exists",
    MANDATORY: "All fields are required",
    SUCCESS: "Successfully Login",
    ERROR: "Username or password incorrect",
  });

  useEffect(() => {
    axios
      .post(`${url}/login`, checkLogin)
      .then((res) => {
        if (res.status === 200) {
          setErrorMessage("");
          setNameErr("");
          setPasswordErr("");

          setSuccessMessage(message.SUCCESS);
        } else {
          setErrorMessage(message.ERROR);
        }
      })
      .catch((error) => {
        setErrorMessage(message.ERROR);
      });
  }, [checkLogin]);
  const handleLogins = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    dispatch(
      loginActions.login({
        username: login.username,
        password: login.password,
      })
    );
  };
  const loginHandler = (e) => {
    e.preventDefault();
    const datas = {
      username: login.username,
      password: login.password,
    };
    if (datas.username.trim() === "" && datas.password.trim() === "") {
      setErrorMessage(message.MANDATORY);
    } else {
      axios
        .post(`${url}/login`, datas)
        .then((res) => {
          if (res.status === 200) {
            setErrorMessage("");
            setNameErr("");
            setPasswordErr("");

            setSuccessMessage(message.SUCCESS);
          } else {
            setErrorMessage(message.ERROR);
          }
        })
        .catch((error) => {
          setErrorMessage(message.ERROR);
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
        } else {
          setLogin({ ...login, [name]: value });
          setNameErr("");
        }
        break;
      case "password":
        if (value.length <= 3) {
          setPasswordErr("password length must be greater than 3");
        } else if (value.length > 20) {
          setPasswordErr("Password cannot exceeed 20 characters");
        } else {
          setLogin({ ...login, [name]: value });
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
      <Form onSubmit={handleLogins}>
        <InputForm
          htmlFor="username"
          label="User ID"
          type="text"
          name="username"
          changeHandler={validationHandler}
        >
          <small id="info" className="form-text text-muted">
            Enter your email or username
          </small>
          {nameErr.length > 0 && (
            <Alert as={Row} variant="danger">
              {nameErr}
            </Alert>
          )}
        </InputForm>
        <InputForm
          htmlFor="password"
          label="Password"
          type="password"
          name="password"
          changeHandler={validationHandler}
        >
           {passwordErr.length > 0 && (
              <Alert as={Row} variant="danger">
                {passwordErr}
              </Alert>
            )}
        </InputForm>
        <Buttons action="submit">Submit</Buttons>
      </Form>
      {errorMessage.length > 0 && (
        <Alert as={Row} variant="danger">
          {errorMessage}
        </Alert>
      )}
      {successMessage.length > 0 && (
        <Alert as={Row} variant="success">
          {successMessage}
        </Alert>
      )}
    </>
  );
};

export default Forms;
