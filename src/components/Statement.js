import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statementAction } from "../store/statement-slice";

const url = "http://localhost:8080/boc/transaction";
export const Statement = (props) => {
  const statement = useSelector((state) => state.statement);
  const dispatch = useDispatch();
  console.log("statement", statement);
  const uri = `${url}/user/${props.account.userId}`;
  useEffect(() => {
    axios
      .get(uri)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            statementAction.loadStatement({ data: res.data, msg: true })
          );
        }
      })
      .catch((error) => {
        dispatch(
          statementAction.loadStatement({ data: error.data, msg: false })
        );
      });
  }, []);
  const dataList = statement.datas.map((d)=>{
    return (
        <>
        <ul>
            <li key={d.transactionId}>{d.transactionDate}</li>
        </ul>
        </>
    )
  })
  return (
    <>
      This is a statement
      {dataList}
    </>
  );
};
