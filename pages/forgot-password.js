import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import qs from 'qs'
import { clearAuthInfo, setAuthInfo, sendCodeToEmail as sendCodeToEmailAction, sendResetPassword as sendResetInfoAction } from '../redux/actions/authAction';
import Login from './login';

export default function ForgotPassword () {
  const router = useRouter();
  const dispatch = useDispatch();
  const [readyToReset, setReadyToReset] = useState(false);
  const { authReducer } = useSelector(state => state);

  useEffect(() => {
    return () => {
      dispatch(clearAuthInfo());
    };
  }, []);

  useEffect(() => {
    console.log('router.query', router.query);

    if (router.query.otp) {
      dispatch(setAuthInfo({
        otp: router.query.otp
      }));
      setReadyToReset(true);
    }
  }, [router.query]);

  useEffect(() => {
    if (authReducer.isError) {
      alert(authReducer.isError);
      dispatch(clearAuthInfo());
    }
    
    if (authReducer.isSuccess) {
      alert(authReducer.isSuccess);
      router.push('/login');
    }
  } , [authReducer]);

  const sendCodeToEmail = (e) => {
    e.preventDefault();
    const email = authReducer.email;

    if (!email) {
      alert('Please fill in all fields');
      return false;
    }

    if (!validator.isEmail(email)) {
      alert('Please enter a valid email');
      return false;
    }

    const dataToSend = qs.stringify({
      email
    })

    dispatch(sendCodeToEmailAction(dataToSend));
  };

  const sendResetInfo = (e) => {
    e.preventDefault();
    const { otp, password, confirmPassword } = authReducer;
    
    if (!otp || !password || !confirmPassword) {
      alert('Data is not complete');
      return false;
    }

    if (password !== confirmPassword) {
      alert('Password and Confirm Password is not match');
      return false;
    }

    const passwordRules = {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    }

    const validatePassword = validator.isStrongPassword(password, passwordRules);

    if (!validatePassword) {
      alert(`
      Your password must be at least: 
        - 6 characters long
        - contain at least one lowercase letter
        - contain at least one uppercase letter
        - contain at least one number
        - contain at least one special character`);
      return false;
    }
    
    const dataToSend = {
      otp,
      newPassword: password,
      confirmPassword: confirmPassword
    }

    const data = qs.stringify(dataToSend);
    console.log('data', data);
    dispatch(sendResetInfoAction(data));
  };

  const resetPasswordHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(setAuthInfo({
      [name]: value
    }));
  };
  return (
    <>
      {
        readyToReset
          ? (
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
  );
}
