import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormLayout = (props) => {
 return(
    <>
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <h1>BANK OF CODE</h1>
          {props.children}
        </Col>
      </Row>
    </Container>
  </>
 );
};
export default FormLayout;
