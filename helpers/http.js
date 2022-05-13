import axios from 'axios';
import constants from './constants';

const {apiURL} = constants;

export const axiosInstance = (useToken = false, multiPart=false) => {
  const headers = {};

  if (useToken) {
    const token = localStorage.getItem('token');
    headers.Authorization = `Bearer ${token}`;
  }

  if (multiPart) {
    headers['Content-Type'] = 'multipart/form-data';
  }

  return axios.create({
    baseURL: apiURL,
    headers
  });
};
