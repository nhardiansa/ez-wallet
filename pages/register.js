import Login from './login';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo } from '../redux/actions/authAction';
import validator from 'validator'
import { useState } from 'react';

export default function Register () {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authReducer } = useSelector(state => state);
  const {isError} = authReducer;

  const [error, setError] = useState('');

  const registerInputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(setAuthInfo({
      [name]: value
    }));
  };

  const sendRegisterInfo = (e) => {
    e.preventDefault();
    const { firstName, lastName, password, email } = authReducer;

    if (!firstName || !lastName || !password || !email) {
      setError('Please fill in all fields');
      return false;
    }

    const passwordRules = {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    }
    const validateEmail = validator.isEmail(email);

    if (!validateEmail) {
      setError('Please enter a valid email');
      return false;
    }

    const validatePassword = validator.isStrongPassword(password, passwordRules);

    if (!validatePassword) {
      setError(`Password must contain at least ${passwordRules.minLength} characters, ${passwordRules.minLowercase} lowercase, ${passwordRules.minUppercase} uppercase, ${passwordRules.minNumbers} numbers, and ${passwordRules.minSymbols} symbols`);
      return false;
    }

    router.push('/create-pin');
  };
  return (
    <>
      <Login
        changeHandler={registerInputHandler} 
        values={authReducer} 
        submitHandler={sendRegisterInfo}
        useClearData={false}
        error={error || isError}
      />
    </>
  );
}
