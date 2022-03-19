import { SET_AUTH_INFO, SET_USER_PIN, CLEAR_AUTH_INFO, SEND_LOGIN_INFO } from "../types/auth"

import {axiosInstance} from '../../helpers/http'
import constants from '../../helpers/constants'
const {baseURL} = constants

export const setUserPin = (pin) => {
  return {
    type: SET_USER_PIN,
    payload: pin
  }
}

export const setAuthInfo = (data) => {
  return {
    type: SET_AUTH_INFO,
    payload: {...data}
  }
}

export const clearAuthInfo = (email=false, token=false, otp=false) => {
  return {
    type: CLEAR_AUTH_INFO,
    payload: {
      token,
      email,
      otp
    }
  }
}

export const sendLoginInfo = (data) => {
  const token = 'Ini token'
  return {
    type: SEND_LOGIN_INFO,
    payload: axiosInstance().post('/auth/login', data)
    // payload: {data: {token}}
  }
}

export const sendRegisterInfo = (data) => {
  return {
    type: 'SEND_REGISTER_INFO',
    payload: axiosInstance().post('/auth/register', data)
  }
}

export const sendCodeToEmail = (data) => {
  const callbackURL = baseURL
  return {
    type: 'SEND_CODE_TO_EMAIL',
    payload: axiosInstance().post(`/auth/forgot-password?callback_url=${callbackURL}`, data)
  }
}

export const sendResetPassword = (data) => {
  return {
    type: 'SEND_RESET_PASSWORD',
    payload: axiosInstance().post('/auth/forgot-password', data)
  }
}
