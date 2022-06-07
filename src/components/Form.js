import React, { useState } from "react";

const Form = () => {
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
  };

  return (
    <>
      <form onSubmit={loginHandler}>
        <div className="form-group row">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            User ID
          </label>
          <div className="col-sm-3">
            <input
              className="form-control"
              type="text"
              name="username"
              onChange={validationHandler}
            />
            <small id="info" class="form-text text-muted">
              Enter your email or username
            </small>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-3">
            <input className="form-control" type="password" />
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-lg btn-block sv">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
