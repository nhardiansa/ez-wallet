import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthInfo, setAuthInfo } from '../redux/actions/authAction';
import Login from "./login";

export default function ForgotPassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [readyToReset, setReadyToReset] = useState(false);
  const {authReducer} = useSelector(state => state);

  useEffect(() => {
    return () => {
      dispatch(clearAuthInfo());
    }
  }, []);

  const sendCodeToEmail = (e) => {
    e.preventDefault();
    setReadyToReset(true);
    alert('send code to email');
  }

  const sendResetInfo = (e) => {
    e.preventDefault();
    console.log(authReducer);
    alert('reset');
    router.push('/login');
  }

  const resetPasswordHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(setAuthInfo({
      [name]: value,
    }));
  }
  return (
    <>
      {
        readyToReset ? (
          <Login
            readyToReset={readyToReset}
            values={authReducer}
            changeHandler={resetPasswordHandler}
            submitHandler={sendResetInfo}
          />
          )
          : (
          <Login
            readyToReset={readyToReset}
            values={authReducer}
            changeHandler={resetPasswordHandler}
            submitHandler={sendCodeToEmail}
          />

        )
      }
    </>
  )
}
