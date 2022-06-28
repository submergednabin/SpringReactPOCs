import React, { Fragment } from "react";
import FormLayout from "./FormLayout";
import { Form, Row, Alert } from "react-bootstrap";
import { authActions } from "../store/authentication";
import { signUpActions } from "../store/sign-up";
import InputForm from "../layout/InputForm";
import Buttons from "../layout/Buttons";

const Register = () => {
  return (
    <FormLayout>
      <Form onSubmit="">
        <InputForm
          htmlFor="username"
          label="Username"
          type="text"
          name="username"
          changeHandler=""
        >
          <small id="info" className="form-text text-muted">
            Enter your email or username
          </small>
          <Alert as={Row} variant="danger"></Alert>
        </InputForm>
        <InputForm
          htmlFor="password"
          label="Password"
          type="password"
          name="password"
          changeHandler=""
        >
          <Alert as={Row} variant="danger"></Alert>
        </InputForm>
        <InputForm
          htmlFor="email"
          label="Email"
          type="email"
          name="email"
          changeHandler=""
        ></InputForm>
        <InputForm
          htmlFor="firstName"
          label="First Name"
          type="text"
          name="firstName"
          changeHandler=""
        ></InputForm>
        <InputForm
          htmlFor="middleName"
          label="Middle Name"
          type="text"
          name="middleName"
          changeHandler=""
        ></InputForm>
        <InputForm
          htmlFor="lastName"
          label="Last Name"
          type="text"
          name="lastName"
          changeHandler=""
        ></InputForm>
        <InputForm htmlFor="zipCode" label="Zip Code" type="text" name="zipCode"></InputForm>
        <Buttons action="submit">Submit</Buttons>
      </Form>
    </FormLayout>
  );
};
export default Register;
