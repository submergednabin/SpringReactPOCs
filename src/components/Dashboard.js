import React, { useEffect } from "react";
import { useSelector, dispatch, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { Account } from "./Account";
import { accountAction } from "../store/account-slice";

import axios from "axios";

const url = "http://localhost:8080/boc";
const Dashboard = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const accountSelect = useSelector((state) => state.account);
  console.log("parameter: ", userId);
  console.log(accountSelect.userId.length);
  useEffect(() => {
    const checkUsernameUrl = `${url}/user/valid/${userId}`;
    axios
      .get(checkUsernameUrl)
      .then((res) => {
        if (res.data === true) {
          dispatch(accountAction.checkValidUser(res.data));
        } else {
          dispatch(accountAction.checkValidUser(res.data));
        }
      })
      .catch((error) => {});
  }, []);
  return (
    <>
      <Container>
        <Row>
          <h1>Dashboard</h1>
          {accountSelect.isValidUser === true ? (
            <p>Welcome!! {userId}</p>
          ) : (
            "Intruder not Allowed"
          )}

          <Account />
        </Row>
      </Container>
    </>
  );
};
export default Dashboard;
