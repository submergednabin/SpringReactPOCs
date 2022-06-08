import { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Forms from "./components/Forms";

function App() {
  return (
    <Fragment>
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <h1>BANK OF CODE</h1>
            <Forms />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default App;
