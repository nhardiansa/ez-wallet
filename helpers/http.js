import axios from 'axios';
import constants from './constants';

const {apiURL} = constants;

export const axiosInstance = (useToken = false) => {
  const headers = {};

  if (useToken) {
    const token = JSON.parse(localStorage.getItem('token'));
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: apiURL,
    headers
  });
};
