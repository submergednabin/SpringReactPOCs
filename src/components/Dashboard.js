import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { Account } from "./Account";

const Dashboard = () => {
  const {userId} = useParams();
  const accountSelect = useSelector((state)=>state.account);
  console.log("parameter: ", userId)
  console.log(accountSelect.userId.length)
  
  return (
    <>
      <Container>
        <Row>
          <h1>Dashboard</h1>
          <p>Welcome!! {userId}</p>
          {accountSelect.userId.length>=0 &&
            <Account />
          }
        </Row>
      </Container>
    </>
  );
};
export default Dashboard;
