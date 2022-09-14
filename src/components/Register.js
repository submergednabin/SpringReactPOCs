import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormLayout from "./FormLayout";
import { Form, Row, Alert } from "react-bootstrap";
import { authActions } from "../store/authentication";
import { signUpActions } from "../store/sign-up";
import InputForm from "../layout/InputForm";
import Buttons from "../layout/Buttons";
import { InputSelect } from "../layout/InputSelect";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const url = "http://localhost:8080/boc";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkValidation = useSelector((state) => state.auth);
  const register = useSelector((state) => state.signup);
  const checkCountries = checkValidation.country;
  console.log(checkValidation);
  const validationHandler = (event) => {
    event.preventDefault();
    const { name, value, id } = event.target;
    if (name === "country") {
      const index = event.target.selectedIndex;
      const el = event.target.childNodes[index];
    }

    if (name === "state") {
      const index = event.target.selectedIndex;
      const el = event.target.childNodes[index];
    }

    dispatch(
      authActions.checkField({
        ...checkValidation,
        [name]: value,
      })
    );
  };

  const listStatesByCountry = useEffect(() => {
    const countryName = checkValidation.country;
    const fullUrl = `${url}/countries/state/${countryName}`;
    if (countryName.length > 0) {
      axios
        .get(fullUrl)
        .then((res) => {
          const datas = res.data;
          dispatch(signUpActions.initialStateLoad(datas));
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            checkValidation.errorMsg = "Server Error ";

            console.log("error");
          }
        });
    }
  }, [checkCountries]);

  const countryList = useEffect(() => {
    const countryUrl = `${url}/countries/all`;
    axios
      .get(countryUrl)
      .then((res) => {
        const data = res.data;
        dispatch(signUpActions.initialLoad(data));
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          checkValidation.errorMsg = "Server Error ";
          console.log(checkValidation.errorMsg);
        }
      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      checkValidation.username.trim() === "" ||
      checkValidation.password.trim() === "" ||
      checkValidation.email.trim() === "" ||
      checkValidation.firstName.trim() === "" ||
      checkValidation.lastName.trim() === "" ||
      checkValidation.phoneNumber.trim() === "" ||
      checkValidation.country.trim() === "" ||
      checkValidation.state.trim() === "" ||
      checkValidation.city.trim() === "" ||
      checkValidation.zipCode.trim() === ""
    ) {
      const msg = "All field Required";
      dispatch(authActions.hasErrorMsg(msg));
    } else {
      console.log(checkValidation.countryId);
      const data = {
        username: checkValidation.username,
        password: checkValidation.password,
        userDetails: {
          email: checkValidation.email,
          firstName: checkValidation.firstName,
          middleName: checkValidation.middleName,
          lastName: checkValidation.lastName,
          phoneNumber: checkValidation.phoneNumber,
          city: checkValidation.city,
          zipCode: checkValidation.zipCode,
          data: {
            name: checkValidation.country,
          },
          state: {
            name: checkValidation.state,
          },
        },
      };
      axios
        .post(`${url}/user`, data)
        .then((res) => {
          // dispatch(authAction.login())
          const msg = "successfully saved";

          if (res.status === 201) {
            navigate("/login", { replace: true });
          }
        })
        .catch((error) => {
          if (error.response) {
            const isUsernameExists = error.response.data;
            console.log(isUsernameExists);
            if (isUsernameExists.length > 0) {
              console.log(error.response.data);
              dispatch(authActions.hasErrorMsg(isUsernameExists));
              // console.log("msg: " + checkValidation.errorMsg)
            } else {
              console.log(error.message);
            }
          }
        });
    }
  };
  return (
    <FormLayout>
      <Form onSubmit={submitHandler}  >
        <InputForm
          htmlFor="username"
          label="Username"
          type="text"
          name="username"
          changeHandler={validationHandler}
          checkErr={!!checkValidation.userError}
          size="3"
        >
          <Form.Control.Feedback type="invalid">
            {checkValidation.userError}
          </Form.Control.Feedback>
          {/* {checkValidation.errorMsg.length > 0 ? checkValidation.errorMsg : ""} */}
        </InputForm>
        <InputForm
          htmlFor="password"
          label="Password"
          type="password"
          name="password"
          changeHandler={validationHandler}
          checkErr={!!checkValidation.pwdError}
          size="3"
        >
          <Form.Control.Feedback type="invalid">
            {checkValidation.pwdError}
          </Form.Control.Feedback>
        </InputForm>
        <InputForm
          htmlFor="email"
          label="Email"
          type="email"
          name="email"
          changeHandler={validationHandler}
          checkErr={!!checkValidation.emailErr}
          size="3"
        >
          <Form.Control.Feedback type="invalid">
            {checkValidation.emailErr}
          </Form.Control.Feedback>
        </InputForm>
        <InputForm
          htmlFor="firstName"
          label="First Name"
          type="text"
          name="firstName"
          changeHandler={validationHandler}
          checkErr={!!checkValidation.firstNameErr}
          size="3"
        >
          <Form.Control.Feedback type="invalid">
            {checkValidation.firstNameErr}
          </Form.Control.Feedback>
        </InputForm>
        <InputForm
          htmlFor="middleName"
          label="Middle Name"
          type="text"
          name="middleName"
          changeHandler={validationHandler}
          checkErr={!!checkValidation.middleNameErr}
          size="3"
        >
          <Form.Control.Feedback type="invalid">
            {checkValidation.middleNameErr}
          </Form.Control.Feedback>
        </InputForm>
        <InputForm
          htmlFor="lastName"
          label="Last Name"
          type="text"
          name="lastName"
          changeHandler={validationHandler}
          checkErr={!!checkValidation.lastNameErr}
          size="3"
        >
          <Form.Control.Feedback type="invalid">
            {checkValidation.lastNameErr}
          </Form.Control.Feedback>
        </InputForm>
        <InputForm
          htmlFor="phoneNumber"
          label="Phone Number"
          type="number"
          name="phoneNumber"
          changeHandler={validationHandler}
          checkErr={!!checkValidation.phoneErr}
          size="3"
        >
          <Form.Control.Feedback type="invalid">
            {checkValidation.phoneErr}
          </Form.Control.Feedback>
        </InputForm>
        <InputSelect
          htmlFor="country"
          label="Country"
          defaultValue="Select Country"
          datas={register.data}
          name="country"
          changeHandler={validationHandler}
        ></InputSelect>
        <InputSelect
          htmlFor="state"
          label="State"
          defaultValue="Select State"
          datas={register.stateList}
          name="state"
          changeHandler={validationHandler}
        ></InputSelect>

        <InputForm
          htmlFor="city"
          label="City"
          type="text"
          name="city"
          changeHandler={validationHandler}
          checkErr={!!checkValidation.cityErr}
          size="3"
        >
          <Form.Control.Feedback type="invalid">
            {checkValidation.cityErr}
          </Form.Control.Feedback>
        </InputForm>
        <InputForm
          htmlFor="zipCode"
          label="Zip Code"
          type="number"
          name="zipCode"
          changeHandler={validationHandler}
          checkErr={!!checkValidation.zipCodeErr}
          size="3"
        >
          <Form.Control.Feedback type="invalid">
            {checkValidation.zipCodeErr}
          </Form.Control.Feedback>
        </InputForm>
        <Buttons class="mx-4" size="sm" action="submit" color="primary">
          Submit
        </Buttons>
      </Form>
      {checkValidation.errorMsg.length > 0 && (
        <Alert variant="danger">{checkValidation.errorMsg}</Alert>
      )}
    </FormLayout>
  );
};
export default Register;
