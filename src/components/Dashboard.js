import React from "react";

import { Container, Row } from "react-bootstrap";
import { Account } from "./Account";

const Dashboard = () => {
  return (
    <>
      <Container>
        <Row>
          <h1>Dashboard</h1>
          <Account />
        </Row>
      </Container>
    </>
  );
};
export default Dashboard;
