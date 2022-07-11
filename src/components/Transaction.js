import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { transactionAction } from "../store/transaction-slice";

const url = "http://localhost:8080/boc/transaction-type";
export const Transaction = (props) => {
  const transaction = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  console.log("transaction: ", transaction);
  const [transactionType, setTransactionType] = useState([]);
  console.log(props.datas);
  console.log(props.stateData);
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
    }

    dispatch(
      transactionAction.postTransactionData({
        ...transaction,
        [name]: value,
        accountId: id,
      })
    );
  };
  return (
    <Fragment>
      {props.accountUsername}
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label htmlFor="accountType" column sm={2}>
            Account Type
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
          <Form.Label htmlFor="transactionType" column sm={2}>
            Action
          </Form.Label>
          <Col sm={3}>
            <Form.Select
              name="transactionType"
              onChange={transactionChangeHandler}

              //   value={props.stateData.accountType}
            >
              <option>Select Transaction</option>
              {type}
            </Form.Select>
          </Col>
        </Form.Group>
      </Form>
    </Fragment>
  );
};
