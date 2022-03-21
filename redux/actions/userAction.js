import {axiosInstance} from '../../helpers/http'

export const getListUser = () => {
  return {
    type: 'GET_LIST_USER',
    payload: axiosInstance(true).get('/users')
  }
}

export const setRecepientDetail = (data) => {
  return {
    type: 'SET_RECEPIENT_DETAIL',
    payload: data
  }
}

export const getUserProfile = () => {
  return {
    type: 'GET_USER_PROFILE',
    payload: axiosInstance(true).get('/profile')
  }
}

export const getCurrentBalance = () => {
  return {
    type: 'GET_CURRENT_BALANCE',
    payload: axiosInstance(true).get('/profile/balance')
  }
}

export const getPhoneList = () => {
  return {
    type: 'GET_PHONE_LIST',
    payload: axiosInstance(true).get('/profile/phones')
  }
}

export const addPhoneNumber = (data) => {
  return {
    type: 'ADD_PHONE_NUMBER',
    payload: axiosInstance(true).post('/profile/phones', data)
  }
}

export const setCurrentBalance = (data) => {
  return {
    type: 'SET_CURRENT_BALANCE',
    payload: data
  }
}
