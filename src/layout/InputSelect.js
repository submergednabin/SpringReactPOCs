import React from "react";
import { Form, Col, Row } from "react-bootstrap";

export const InputSelect = (props) => {
  const name = props.datas.map((data) => {
    return data !== null ? (
      <option
        key={data.id ? data.id : data.accountTypeId}
        id={data.id ? data.id : data.accountTypeId}
        value={data.name}
      >
        {data.name ? data.name : data.accountName}
      </option>
    ) : (
      <option>Empty</option>
    );
  });
  return (
    <>
      <Form.Group as={Row} className="mb-3">
        <Form.Label htmlFor={props.htmlFor} column sm={2}>
          {props.label}
        </Form.Label>
        <Col sm={3}>
          <Form.Select
            name={props.name}
            onChange={props.changeHandler}
            value={props.value}
          >
            <option>{props.defaultValue}</option>
            {name}
          </Form.Select>
        </Col>
      </Form.Group>
    </>
  );
};
