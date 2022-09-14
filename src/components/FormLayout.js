import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormLayout = (props) => {
 return(
    <>
    <Container>
      <Row >
        <Col>
          {props.children}
        </Col>
      </Row>
    </Container>
  </>
 );
};
export default FormLayout;
