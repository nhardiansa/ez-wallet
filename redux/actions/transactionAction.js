import {axiosInstance} from '../../helpers/http'

export const setTransferAmount = (data) => {
  return {
    type: 'SET_TRANSFER_AMOUNT',
    payload: data
  }
}

export const setBalanceLeft = (data) => {
  return {
    type: 'SET_BALANCE_LEFT',
    payload: data
  }
}

export const setDateTime = (data) => {
  return {
    type: 'SET_DATE_TIME',
    payload: data
  }
}

export const setNotes = (data) => {
  return {
    type: 'SET_NOTES',
    payload: data
  }
}

export const sendMoney = (data) => {
  return {
    type: 'SEND_MONEY',
    payload: axiosInstance(true).post('/transactions/transfer', data)
  }
}

export const clearTransaction = () => {
  return {
    type: 'CLEAR_TRANSACTION',
  }
}

export const showModal = (data) => {
  return {
    type: 'SHOW_MODAL',
    payload: data
  }
}
