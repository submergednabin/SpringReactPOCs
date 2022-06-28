import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormLayout from "./FormLayout";
import { Form, Row, Alert } from "react-bootstrap";
import { authActions } from "../store/authentication";
import { signUpActions } from "../store/sign-up";
import InputForm from "../layout/InputForm";
import Buttons from "../layout/Buttons";

const Register = () => {
  const dispatch = useDispatch();
  const checkValidation = useSelector((state) => state.auth);
  const register = useSelector((state) => state.signup);
  console.log(register);
  console.log(checkValidation);

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

  const submitHandler = () => {
    console.log("submitted");
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
        >
        <div >
        {checkValidation.userError.length > 0 && (
            <Alert as={Row} variant="danger">
              {checkValidation.userError}
            </Alert>
          )}
        </div>
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
        >
          <Alert as={Row} variant="danger"></Alert>
        </InputForm>
        <InputForm
          htmlFor="email"
          label="Email"
          type="email"
          name="email"
          changeHandler={validationHandler}
        ></InputForm>
        <InputForm
          htmlFor="firstName"
          label="First Name"
          type="text"
          name="firstName"
          changeHandler={validationHandler}
        ></InputForm>
        <InputForm
          htmlFor="middleName"
          label="Middle Name"
          type="text"
          name="middleName"
          changeHandler={validationHandler}
        ></InputForm>
        <InputForm
          htmlFor="lastName"
          label="Last Name"
          type="text"
          name="lastName"
          changeHandler={validationHandler}
        ></InputForm>
        <InputForm
          htmlFor="zipCode"
          label="Zip Code"
          type="text"
          name="zipCode"
          changeHandler={validationHandler}
        ></InputForm>
        <Buttons action="submit">Submit</Buttons>
      </Form>
    </FormLayout>
  );
};
export default Register;
