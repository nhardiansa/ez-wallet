import { SET_AUTH_INFO, SET_USER_PIN, CLEAR_AUTH_INFO } from "../types/auth"

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