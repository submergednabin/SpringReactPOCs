import React from "react";

const Form = () => {

    const loginHandler = (e) => {
        e.preventDefault();
        alert("login handler");
    }

  return (
    <>
      <form onSubmit={loginHandler}>
        <div className="form-group row">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            User ID
          </label>
          <div className="col-sm-3">
            <input className="form-control" type="text" />
            <small id="emailHelp" class="form-text text-muted">
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
