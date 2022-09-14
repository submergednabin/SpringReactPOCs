import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { Form, Row, Alert } from "react-bootstrap";
import axios from "axios";
import { loginActions } from "../store/login-slice";
import { authActions } from "../store/authentication";
import InputForm from "../layout/InputForm";
import Buttons from "../layout/Buttons";
import FormLayout from "./FormLayout";
import styles from "./Form.module.css";

const url = "http://localhost:8080/boc";
const Forms = () => {
  const dispatch = useDispatch();

  // React router redirect hooks
  const navigate = useNavigate();

  const checkValidation = useSelector((state) => state.auth);

  const [submit, setSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [message] = useState({
    NAME_ERR:
      "Username must be greater than 2 Letter and must not contain special characters",
    PWD_INVALID: "password must be valid / Incorrect",
    USER_INVALID: "User name doesn't exists",
    MANDATORY: "All fields are required",
    SUCCESS: "Successfully Login",
    ERROR: "Username or password incorrect",
    SERVER_ERR: "Something is wrong with server",
  });

  const handleLogins = (event) => {
    event.preventDefault();

    if (
      checkValidation.username.trim() !== "" &&
      checkValidation.password.trim() !== ""
    ) {
      setSubmit(true);
      dispatch(
        loginActions.login({
          username: checkValidation.username,
          password: checkValidation.password,
          isAuthenticated: true,
        })
      );
    } else {
      setErrorMessage(message.MANDATORY);
      setSubmit(false);
    }
  };

  useEffect(() => {
    const datas = {
      username: checkValidation.username,
      password: checkValidation.password,
    };
    // console.log(datas);
    if (submit === true) {
      axios
        .post(`${url}/login`, datas)
        .then((res) => {
          console.log("dsata", res);
          if (res.status === 200) {
            setErrorMessage("");
            const link = `/user/${checkValidation.username}/dashboard`;
            navigate(link, { replace: true });
            setSuccessMessage(message.SUCCESS);
          } else {
            setErrorMessage(message.ERROR);
          }
        })
        .catch((error) => {
          console.log(error.code === "ERR_NETWORK" ? "network Error" : "");
          if (error.code === "ERR_NETWORK") {
            setErrorMessage(message.SERVER_ERR);
          } else {
            setErrorMessage(message.ERROR);
          }
        });
    }
  });

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
    dispatch(
      authActions.checkField({
        ...checkValidation,
        [name]: value,
      })
    );
  };
  const cssLogin = `${styles.loginForm} col-lg-8 offset-lg-2`;
  return (
    <>
      <FormLayout>

        <Form className="col-md-10 offset-1 mt-4 " onSubmit={handleLogins}>
          <div className={cssLogin}>
            <h1>BANK OF CODE</h1>
            {errorMessage.length > 0 && (
              <p className={styles["invalid-required"]}>{errorMessage}</p>
            )}
            {successMessage.length > 0 && (
              <Alert as={Row} variant="success">
                {successMessage}
              </Alert>
            )}
            <InputForm
              htmlFor="username"
              label="Username"
              type="text"
              name="username"
              changeHandler={validationHandler}
              checkErr={!!checkValidation.userError}
              size="6"
            >
              <small id="info" className="form-text text-muted">
                Enter your email or username
              </small>
              {checkValidation.userError.length > 0 && (
                <Form.Control.Feedback type="invalid">
                  {checkValidation.userError}
                </Form.Control.Feedback>
              )}
            </InputForm>
            <InputForm
              htmlFor="password"
              label="Password"
              type="password"
              name="password"
              changeHandler={validationHandler}
              checkErr={!!checkValidation.pwdError}
              size="6"
            >
              {checkValidation.pwdError.length > 0 && (
                <Form.Control.Feedback type="invalid">
                  {checkValidation.pwdError}
                </Form.Control.Feedback>
              )}
            </InputForm>
            <Buttons class="mx-4" size="sm" action="submit" color="primary">
              Login
            </Buttons>
            <NavLink to="/signup">
              <Buttons class="mx-4" size="sm" color="primary">
                Create new Login
              </Buttons>
            </NavLink>
          </div>
        </Form>
      </FormLayout>
    </>
  );
};

export default Forms;
