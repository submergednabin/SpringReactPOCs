import Cards from "../layout/Card";
import { Container, Row } from "react-bootstrap";
const Dashboard = () => {
  return (
    <>
      <Container>
        <Row>
          <h1>Dashboard</h1>
          <Cards title="Balance Transfer" text="The description of account" />
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
