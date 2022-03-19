import { SET_AUTH_INFO, SET_USER_PIN, CLEAR_AUTH_INFO, SEND_LOGIN_INFO } from "../types/auth"

import {axiosInstance} from '../../helpers/http'

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

export const clearAuthInfo = () => {
  return {
    type: CLEAR_AUTH_INFO,
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
