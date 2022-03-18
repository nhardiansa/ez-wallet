import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Login from './login'
import {setAuthInfo, setUserPin} from '../redux/actions/authAction'

export default function CreatePin() {

  const {authReducer} = useSelector(state => state);
  const dispatch = useDispatch();

  const setPin = (pin) => {
    dispatch(setAuthInfo({
      userPin: pin,
    }));
  }
  return (
    <Login changeHandler={setPin} values={authReducer.userPin} />
  )
}
