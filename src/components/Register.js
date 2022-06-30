import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormLayout from "./FormLayout";
import { Form, Row, Alert } from "react-bootstrap";
import { authActions } from "../store/authentication";
import { signUpActions } from "../store/sign-up";
import InputForm from "../layout/InputForm";
import Buttons from "../layout/Buttons";
import { InputSelect } from "../layout/InputSelect";
import axios from "axios";

const url = "http://localhost:8080/boc";
const Register = () => {
  const dispatch = useDispatch();
  const checkValidation = useSelector((state) => state.auth);
  const register = useSelector((state) => state.signup);
  const checkCountries = checkValidation.country;
  console.log(checkValidation)
  const validationHandler = (event) => {
    event.preventDefault();
    let  { name, value } = event.target;
    if (name === "country" ) {
      const index = event.target.selectedIndex;
      const el = event.target.childNodes[index];
      var countryId = el.getAttribute("id");
      
    }

    if(name === "state"){
      const index = event.target.selectedIndex;
      const el = event.target.childNodes[index];
      var stateId = el.getAttribute("id");
    }
    
    dispatch(
      authActions.checkField({
        ...checkValidation,
        [name]: value,
        countryId:countryId,
        stateId:stateId
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
            // console.log(checkValidation.errorMsg)
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

  // const countryName = register.data.map((d)=> {
  //   <li key={d.id}>{d.name}</li>
  // })
  // countryList.map((map,index)=> {
  //   <div>
  //     <li key={index}>{map.name}</li>
  //   </div>
  // })

  const submitHandler = (event) => {
    event.preventDefault();
    if (checkValidation !== null) {
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
          console.log("saved Successfully");
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
        });
    } else {
      console.log(" validation");
    }
  };
  return (
    <FormLayout>
      <Form onSubmit={submitHandler}>
        <InputForm
          htmlFor="username"
          label="Username"
          type="text"
          name="username"
          changeHandler={validationHandler}
          checkErr={!!checkValidation.userError}
        >
          {/* {checkValidation.userError.length > 0 && ( */}
          {/* // <Alert as={Row} variant="danger">
            //   {checkValidation.userError}
            // </Alert> */}
          <Form.Control.Feedback type="invalid">
            {checkValidation.userError}
          </Form.Control.Feedback>
          {/* // )} */}

          <small id="info" className="form-text text-muted">
            Enter your email or username
          </small>
        </InputForm>
        <InputForm
          htmlFor="password"
          label="Password"
          type="password"
          name="password"
          changeHandler={validationHandler}
          checkErr={!!checkValidation.pwdError}
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
        {/* <InputSelect
          htmlFor="state"
          label="State"
          defaultValue="Select State"
          ids={Math.random()}
          keys="Afghanistan"
        ></InputSelect> */}
        {/* <InputForm
          htmlFor="country"
          label="country"
          type="text"
          name="country"
          changeHandler={validationHandler}
          checkErr={!!checkValidation.countryErr}
        >
          <Form.Control.Feedback type="invalid">
            {checkValidation.countryErr}
          </Form.Control.Feedback>
        </InputForm> */}
        <InputForm
          htmlFor="city"
          label="City"
          type="text"
          name="city"
          changeHandler={validationHandler}
          checkErr={!!checkValidation.cityErr}
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
        >
          <Form.Control.Feedback type="invalid">
            {checkValidation.zipCodeErr}
          </Form.Control.Feedback>
        </InputForm>
        <Buttons action="submit">Submit</Buttons>
      </Form>
    </FormLayout>
  );
};
export default Register;
