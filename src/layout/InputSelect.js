import React from "react";
import { Form, Col, Row } from "react-bootstrap";

export const InputSelect = (props) => {
  const countryName = props.datas.map((data) => {
    return (
        data!==null?
      <option key={data.id} id={data.id} value={data.name}>
        {data.name}
      </option>: <option>Empty</option>
    );
  });
  return (
    <>
      <Form.Group as={Row} className="mb-3">
        <Form.Label htmlFor={props.htmlFor} column sm={2}>
          {props.label}
        </Form.Label>
        <Col sm={3}>
          <Form.Select name={props.name} onChange={props.changeHandler}>
            <option>{props.defaultValue}</option>
            {countryName}
          </Form.Select>
        </Col>
      </Form.Group>
    </>
  );
};
