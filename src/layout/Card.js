import React from "react";
import { Card } from "react-bootstrap";

const Cards = (props) => {
  return (
      <Card bg="primary">
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Title variant=''>{props.title}</Card.Title>
          <Card.Text>{props.text}</Card.Text>
        </Card.Body>
      </Card>
  );
};
export default Cards;
