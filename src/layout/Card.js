import React from "react";
import { Card } from "react-bootstrap";
import styles from './Card.module.css';
const Cards = (props) => {
  return (
      <Card className={styles.card} bg={props.variant}>
        <Card.Body>
          {props.children}
        </Card.Body>
      </Card>
  );
};
export default Cards;
