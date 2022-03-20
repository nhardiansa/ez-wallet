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
