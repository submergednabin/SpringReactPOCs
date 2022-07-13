import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { transactionAction } from "../store/transaction-slice";
import Buttons from "../layout/Buttons";

const url = "http://localhost:8080/boc/transaction-type";
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
    axios
      .get(url)
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
    console.log(transaction.accountId.length);
    if (
      transaction.accountId !== "" &&
      transaction.transactionId !== "" &&
      transaction.transactionAmount !== ""
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
      };

      dispatch(transactionAction.submitTransaction({successMsg: true}))
    } else {
      dispatch(transactionAction.submitTransaction({ errorMsg: null }));
    }
  };
  return (
    <Fragment>
      {/* {props.accountUsername} */}
      <Form noValidate onSubmit={submitTransactionHandler}>
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
