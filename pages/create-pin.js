import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import Login from './login';
import { clearAuthInfo, sendRegisterInfo, setAuthInfo, setUserPin } from '../redux/actions/authAction';
import Swal from 'sweetalert2'

export default function CreatePin () {
  const router = useRouter();
  const { authReducer } = useSelector(state => state);
  const dispatch = useDispatch();

  const [error, setError] = useState('');

  useEffect(() => {
    const { password, email, firstName, lastName, isError, isSuccess } = authReducer;
    
    if (!password || !email || !firstName || !lastName) {
      router.push('/register');
    }

    if (isError) {
      Swal.fire({
        title: 'Failed',
        text: isError,
        icon: 'error',
      })
      router.push('/register');
      dispatch(clearAuthInfo(true));
    }

    if (isSuccess) {
      alert(isSuccess);
      router.push('/login');
    }
  }, [authReducer]);

  const setPin = (pin) => {
    dispatch(setAuthInfo({
      userPin: pin
    }));
  };

  const sendPin = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    const { userPin } = authReducer;

    if (!userPin || (userPin.length !== 6)) {
      setError('Please enter a valid pin');
      return false;
    }

    
    const dataToSend = {
      fullName: `${authReducer.firstName} ${authReducer.lastName}`,
      email: authReducer.email,
      pin: authReducer.userPin,
      password: authReducer.password
    }

    for (const key in dataToSend) {
      if (dataToSend[key]) {
        params.append(key, dataToSend[key]);
      }
    }

    if (Object.keys(dataToSend).length < 4) {
      setError('Data not valid to register');
      return false;
    }

    for (const key in dataToSend) {
      if (dataToSend[key]) {
        params.append(key, dataToSend[key]);
      }
    }

    const data = qs.stringify(dataToSend);
    console.log(data);
    dispatch(sendRegisterInfo(data));
  }
  return (
    <Login 
      changeHandler={setPin} 
      values={authReducer.userPin} 
      submitHandler={sendPin}
      error={error}
      />
  );
}
