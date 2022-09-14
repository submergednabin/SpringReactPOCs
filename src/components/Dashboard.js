import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { Account } from "./Account";
import { accountAction } from "../store/account-slice";
import { userActions } from "../store/user-slice";
import styles from "../components/Dashboard.module.css";

import axios from "axios";
import { Header } from "../layout/Header";

const url = "http://localhost:8080/boc";
const Dashboard = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const accountSelect = useSelector((state) => state.account);
  const userSelector = useSelector((state)=> state.user)
  useEffect(() => {
    const userUrl = `${url}/user/user-detail/${userId}`;
    axios.get(userUrl).then((res) => {
      dispatch(userActions.loadUserDetails(res.data));
    }).catch((err)=>{
      dispatch(userActions.setErrorMsg(err.message))
    });
  },[]);

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
        <Row className={styles['main-class']}>
          <Header userData={userSelector} />
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
