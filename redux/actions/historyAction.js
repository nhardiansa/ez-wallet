import { axiosInstance } from '../../helpers/http';

export const getHistories = () => {
  return {
    type: 'GET_HISTORIES',
    payload: axiosInstance(true).get('/transactions/history')
  }
}
