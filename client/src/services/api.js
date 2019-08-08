import axios from 'axios';

export default () => {
  const api = axios.create({
    baseURL: '/api'
  });

  api.interceptors.request.use(
    config => {
      // show loading?
      console.log('request...');
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    config => {
      // show loading?
      console.log('...response');
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  return api;
};
