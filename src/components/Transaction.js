import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Form, Col, Row, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { transactionAction } from "../store/transaction-slice";
import Buttons from "../layout/Buttons";

const url = "http://localhost:8080/boc";
export const Transaction = (props) => {
  const transaction = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  console.log("transaction: ", transaction);
  const [transactionType, setTransactionType] = useState([]);

  const listUserAccountType = props.datas.map((data) => {
    return (
      <option key={data.id} id={data.id} value={data.accountType.accountName}>
        {data.accountType.accountName}
      </option>
    );
  });
  useEffect(() => {
    const url1 = `${url}/transaction-type`;
    axios
      .get(url1)
      .then((res) => {
        setTransactionType(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const type = transactionType.map((d) => {
    return (
      <option key={d.id} value={d.id}>
        {d.transactionType}
      </option>
    );
  });
  const transactionChangeHandler = (event) => {
    const { name, value } = event.target;
    let id = null;
    if (name === "accountType") {
      const index = event.target.selectedIndex;
      const el = event.target.childNodes[index];
      id = el.getAttribute("id");
      if (id === null) {
        id = "";
      }
    }
    dispatch(
      transactionAction.postTransactionData({
        ...transaction,
        [name]: value,
        accountId: id,
      })
    );
  };
  const submitTransactionHandler = (event) => {
    event.preventDefault();
    console.log("submit after " + transaction.transactionAmount);
    if (
      transaction.accountId !== "" &&
      transaction.transactionId !== "undefined" &&
      transaction.transactionAmount > 0
    ) {
      const datas = {
        user: {
          username: props.username,
        },
        account: {
          id: transaction.accountId,
        },
        transactionType: {
          id: transaction.transactionTypeId,
        },
        transactionAmount: transaction.transactionAmount,
        transactionStatus: transaction.status,
        description: transaction.description,
        transactionDate: transaction.transactionDate,
      };
      console.log(datas);
      const url2 = `${url}/account/update/${props.username}/${transaction.accountId}`;
      axios
        .put(url2, datas)
        .then((res) => {
          console.log(res.status);
        })
        .catch((error) => {
          console.log(error);
        });
      dispatch(transactionAction.submitTransaction({ successMsg: true }));
    } else {
      // console.log("transaction amt" + transaction.transactionAmount);
      // if (transaction.transactionAmount === "0") {
      //   dispatch(transactionAction.submitTransaction({ amountErr: 0 }));
      // }

      dispatch(transactionAction.submitTransaction({ errorMsg: true }));
    }
  };
  return (
    <Fragment>
      {/* {props.accountUsername} */}
      <Form noValidate onSubmit={submitTransactionHandler}>
      {transaction.errorMsg.length > 0 && (
        <Alert variant="danger">{transaction.errorMsg}</Alert>
      )}
      {transaction.successMsg.length > 0 && (
        <Alert variant="success">{transaction.successMsg}</Alert>
      )}
        <Form.Group as={Row} className="mb-3">
          <Form.Label htmlFor="accountType" column sm={2}>
            Account Type *
          </Form.Label>
          <Col sm={3}>
            <Form.Select
              name="accountType"
              onChange={transactionChangeHandler}
              value={transaction.accountType}
            >
              <option>Select Account Type</option>
              {listUserAccountType}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label htmlFor="transactionTypeId" column sm={2}>
            Action *
          </Form.Label>
          <Col sm={3}>
            <Form.Select
              name="transactionTypeId"
              onChange={transactionChangeHandler}
              value={transaction.transactionTypeId}
              //   value={props.stateData.accountType}
            >
              <option>Select Transaction</option>
              {type}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label htmlFor="transactionAmount" column sm={2}>
            Amount *
          </Form.Label>
          <Col sm={3}>
            <Form.Control
              type="number"
              name="transactionAmount"
              onChange={transactionChangeHandler}
              // required
              // isInvalid={props.checkErr}
              value={transaction.transactionAmount}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label htmlFor="description" column sm={2}>
            Description
          </Form.Label>
          <Col sm={3}>
            <Form.Control
              as="textarea"
              name="description"
              onChange={transactionChangeHandler}
              // required
              // isInvalid={props.checkErr}
              value={transaction.description}
            />
          </Col>
        </Form.Group>
        <Buttons action="submit" color="success">
          Add
        </Buttons>
      </Form>
     
    </Fragment>
  );
};
