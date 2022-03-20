import {axiosInstance} from '../../helpers/http'

export const getListUser = () => {
  return {
    type: 'GET_LIST_USER',
    payload: axiosInstance(true).get('/users')
  }
}
