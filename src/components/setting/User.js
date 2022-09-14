import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../../layout/Header";
import axios from "axios";
import { url } from "../../layout/SharedInfo";
import { useParams } from "react-router-dom";
import { userActions } from "../../store/user-slice";

const User = (props) => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user);
  useEffect(() => {
    const userUrl = `${url}/user/user-detail/${userId}`;
    axios
      .get(userUrl)
      .then((res) => {
        dispatch(userActions.loadUserDetails(res.data));
      })
      .catch((err) => {
        dispatch(userActions.setErrorMsg(err.message))
      });
  }, []);
  return (
    <>
      <Header userData={userSelector} />;
    
    </>
  );
};

export default User;
