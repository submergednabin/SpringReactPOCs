import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { loginActions } from "../store/login-slice";
import { authActions } from "../store/authentication";
import InputForm from "../layout/InputForm";
import Buttons from "../layout/Buttons";

const url = "http://localhost:8080/boc";
const Forms = () => {
  const dispatch = useDispatch();

  // const [login, setLogin] = useState({
  //   username: "",
  //   password: "",
  // });

  const checkLogin = useSelector((state) => state.login);
  const checkValidation = useSelector((state) => state.auth );
console.log(checkValidation)

  const [submit, setSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // const [nameErr, setNameErr] = useState("");
  // const [passwordErr, setPasswordErr] = useState("");
  const [message] = useState({
    NAME_ERR:
      "Username must be greater than 2 Letter and must not contain special characters",
    PWD_INVALID: "password must be valid / Incorrect",
    USER_INVALID: "User name doesn't exists",
    MANDATORY: "All fields are required",
    SUCCESS: "Successfully Login",
    ERROR: "Username or password incorrect",
  });

  const handleLogins = (event) => {
    event.preventDefault();
    // const { name, value } = event.target;
    // if(login.username.trim()!=="" && login.password.trim()!== ""){
    if(checkValidation.username.trim()!=="" && checkValidation.password.trim()!== ""){
      console.log("hey")
      setSubmit(true);
      dispatch(
        loginActions.login({
          username: checkValidation.username,
          password: checkValidation.password,
          isAuthenticated: true
        })
        );
      }else{
        setErrorMessage(message.MANDATORY);
        setSubmit(false);

      }
  };

  useEffect(() => {
    // const datas = {
    //   username: checkLogin.username,
    //   password: checkLogin.password,
    // };
    const datas = {
      username: checkValidation.username,
      password: checkValidation.password
    }
    console.log(datas)
    if (submit===true) {
      console.log('hello')
      axios
        .post(`${url}/login`, datas)
        .then((res) => {
          if (res.status === 200) {
            setErrorMessage("");
            // setNameErr("");
            // setPasswordErr("");

            setSuccessMessage(message.SUCCESS);
          } else {
            setErrorMessage(message.ERROR);
          }
        })
        .catch((error) => {
          setErrorMessage(message.ERROR);
        });
    }
  }, [checkLogin]);

  const loginHandler = (e) => {
    e.preventDefault();
    const datas = {
      username: checkValidation.username,
      password: checkValidation.password,
    };
    if (datas.username.trim() === "" && datas.password.trim() === "") {
      setErrorMessage(message.MANDATORY);
    } else {
      axios
        .post(`${url}/login`, datas)
        .then((res) => {
          if (res.status === 200) {
            setErrorMessage("");
            // setNameErr("");
            // setPasswordErr("");

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
    dispatch(authActions.checkField({
      ...checkValidation, [name]:value
    }));
    // switch (name) {
    //   case "username":
    //     if (value.length <= 2) {
    //       setNameErr("Username must be greater than 2 characters");
    //     }
    //      else {
    //       setLogin({ ...login, [name]: value });
    //       setNameErr("");
    //     }
    //     break;
    //   case "password":
    //     if (value.length <= 3) {
    //       setPasswordErr("password length must be greater than 3");
    //     } else if (value.length > 20) {
    //       setPasswordErr("Password cannot exceeed 20 characters");
    //     } else {
    //       setLogin({ ...login, [name]: value });
    //       setPasswordErr("");
    //     }
    //     break;

    //   default:
    //       setErrorMessage(message.MANDATORY);
    //     break;
    // }
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
          {checkValidation.userError.length > 0 && (
            <Alert as={Row} variant="danger">
              {checkValidation.userError}
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
          {checkValidation.pwdError.length > 0 && (
            <Alert as={Row} variant="danger">
              {checkValidation.pwdError}
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
