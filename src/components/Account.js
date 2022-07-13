import React, { useEffect } from "react";
import Cards from "../layout/Card";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { accountAction } from "../store/account-slice";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import InputForm from "../layout/InputForm";

import { InputSelect } from "../layout/InputSelect";
import Buttons from "../layout/Buttons";
import { AccordianLayout } from "../layout/AccordianLayout";
import { Transaction } from "./Transaction";
import { ErrorPage } from "../layout/ErrorPage";

const url = "http://localhost:8080/boc";
export const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  console.log("User Name: ", account);
  const { userId } = useParams();

  let totalSum = 0;
  const balanceCardDetails = account.datas.map((dt, i) => {
    totalSum += dt.total_Amount;
    return (
      <p key={dt.id}>
        {dt.accountType.accountName} Balance: {dt.total_Amount}
      </p>
    );
  });

  //loading account data for first time and only when accountType changes
  useEffect(() => {
    const fullUrl = `${url}/account/username/${userId}`;
    axios
      .get(fullUrl)
      .then((res) => {
        if (res.data.length <= 0) {
          dispatch(
            accountAction.createAccount({
              data: res.data,
              totalAccounts: 0,
              userId: "",
            })
          );
        } else {
          const total = res.data.length;
          dispatch(
            accountAction.createAccount({
              data: res.data,
              totalAccounts: total,
              userId: userId,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [account.accountType]);

  //loading all the type of account
  useEffect(() => {
    const accountTypeUri = `${url}/account/type`;
    axios.get(accountTypeUri).then((res) => {
      console.log("run after submitttt");
      const accountData = res.data;
      dispatch(accountAction.loadAccountData(accountData));
    });
  }, []);

  //handling the account field information and
  // saving it in redux so that it can be used later to saveit in database
  const accountEventHandler = (event) => {
    const { name, value } = event.target;
    // const index = event.target.selectedIndex;
    // const el = event.target.childNodes[index]
    // const id = el.getAttribute('id');
    dispatch(
      accountAction.handleAccount({
        ...account,
        [name]: value,
        userId: userId,
        // accountId:id
      })
    );
  };

  //after all the form fields condition met, it is submitted to database to create an account 
  const submitHandler = (event) => {
    event.preventDefault();
    const submitUrl = `${url}/account`;
    const data = {
      date_created: account.dateCreated,
      user: {
        username: account.userId,
      },
      accountType: {
        accountName: account.accountType,
      },
      total_Amount: account.depositedAmount,
    };
    axios
      .post(submitUrl, data)
      .then((res) => {
        if (res.status === 201) {
          const msg = "successfully saved";

          dispatch(accountAction.cleanAccountField(msg));
        }
        // const link = `/user/${userId}/dashboard`;
        // navigate(link, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //   const inValidUser = userId !== account.userId ? "yes":"no";
  // console.log("userId:", userId);
  return (
    <>
      {account.isValidUser === true ? (
        <Cards variant="primary">
          <Card.Title>Create New Account</Card.Title>
          <Form onSubmit={submitHandler}>
            <InputSelect
              htmlFor="accountType"
              label="Account Type"
              defaultValue="Select Account"
              datas={account.accountData}
              name="accountType"
              changeHandler={accountEventHandler}
              value={account.accountType}
            ></InputSelect>
            <InputForm
              htmlFor="depositedAmount"
              type="number"
              label="Deposit Amount"
              name="depositedAmount"
              changeHandler={accountEventHandler}
              value={account.depositedAmount}
            ></InputForm>

            <Buttons action="submit" color="success">
              Create Account
            </Buttons>
          </Form>
        </Cards>
      ) : (
        <ErrorPage
          errorTitle="Page Not Found - 404 Error"
          reRouteLink="/login"
          routingTitle="Go to Login"
        />
      )}

      {account.totalAccounts > 0 && (
        <AccordianLayout accordionKey="0" accordianTitle="Balance Details">
          <Cards variant="success">
            <Card.Title>{balanceCardDetails}</Card.Title>

            <Card.Text>Total Balance : {totalSum}</Card.Text>
          </Cards>

          {/* <Cards class="balance-card">
            <Card.Title>Total Balance</Card.Title>
            <Card.Title variant=""></Card.Title>
            <Card.Text>The description of account</Card.Text>
          </Cards> */}
        </AccordianLayout>
      )}
      {account.totalAccounts > 0 && (
        <AccordianLayout
          accordionKey="1"
          accordianTitle="Statements"
        ></AccordianLayout>
      )}
      {account.totalAccounts > 0 && (
        <AccordianLayout accordionKey="1" accordianTitle="New Transaction">
          <Transaction
            stateData={account}
            accountUsername={account.userId}
            datas={account.datas}
            changeHandler={accountEventHandler}
            username = {account.userId}
          />
        </AccordianLayout>
      )}
    </>
  );
};
