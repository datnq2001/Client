import axios from 'axios';
import queryString from 'query-string';

const axiosClient_V1 = axios.create({
  // baseURL: process.env.REACT_APP_API_URL_V1,
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient_V1.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

axiosClient_V1.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);


export default axiosClient_V1;
