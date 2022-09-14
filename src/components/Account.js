import React, { useEffect } from "react";
import Cards from "../layout/Card";
import { Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { accountAction } from "../store/account-slice";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import InputForm from "../layout/InputForm";

import { InputSelect } from "../layout/InputSelect";
import Buttons from "../layout/Buttons";
import { AccordianLayout } from "../layout/AccordianLayout";
import { Transaction } from "./Transaction";
import { ErrorPage } from "../layout/ErrorPage";
import { Statement } from "./Statement";
import { Header } from "../layout/Header";

const url = "http://localhost:8080/boc";
export const Account = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const userSelector = useSelector((state) => state.user);
  const transaction = useSelector((state) => state.transaction);
  console.log("account Datas: ", account);
  const { userId } = useParams();
  const { pathname } = useLocation();
  let totalSum = 0;
  console.warn("Account check ", account);

  //only suming the saving and checking accounts coz credit is not the assets it is a debt
  const balanceCardDetails = account.datas.map((dt, i) => {
    if (dt.accountType.accountName !== "Credit") {
      totalSum += dt.total_Amount;
    }
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

    if (
      account.accountType.trim() !== "" &&
      account.depositedAmount.trim() !== ""
    ) {
      axios
        .post(submitUrl, data)
        .then((res) => {
          console.warn("check account post status: " + res.status);
          if (res.status === 201) {
            const msg = res.data;
            dispatch(accountAction.cleanAccountField(msg));
          }
          // const link = `/user/${userId}/dashboard`;
          // navigate(link, { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const msg = "All fields required";
      dispatch(accountAction.cleanAccountField(msg));
    }
  };
  const routerPath = `/user/${userId}/newAccount`;
  // const isMatch = matchPath(routerPath, pathname)
  const isMatch = pathname === routerPath;
  //   const inValidUser = userId !== account.userId ? "yes":"no";
  // console.log("userId:", userId);
  // console.log("check Account route :" , checkRouter)
  return (
    <>
      {isMatch && <Header userData={userSelector} />}
      {account.isValidUser === true ? (
        <Cards variant="primary">
          {account.msg.length > 0 && (
            <Alert variant="danger">{account.msg}</Alert>
          )}
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
              size="3"
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

      {!isMatch && account.totalAccounts > 0 && (
        <AccordianLayout accordionKey="0" accordianTitle={`Balance Summary `}>
          <Cards variant="danger">
            <Card.Title>{balanceCardDetails}</Card.Title>

            <Card.Text>Total Balance : {totalSum}</Card.Text>
          </Cards>
        </AccordianLayout>
      )}

      {!isMatch && account.totalAccounts > 0 && (
        <AccordianLayout accordionKey="1" accordianTitle="New Transaction">
          <Transaction
            stateData={account}
            accountUsername={account.userId}
            datas={account.datas}
            changeHandler={accountEventHandler}
            username={account.userId}
          />
        </AccordianLayout>
      )}
      {!isMatch && account.totalAccounts > 0 && (
        <AccordianLayout accordionKey="2" accordianTitle="Statements">
          <Statement transaction={transaction} account={account}></Statement>
        </AccordianLayout>
      )}
    </>
  );
};
