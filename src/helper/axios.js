import axios from 'axios';
import { authenticationService } from '../components/services';
const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_DEV_URL: process.env.REACT_APP_API_DEV_URL;
export const instance = axios.create({
    baseURL: API_URL,
    timeout: 6000,
    headers: {'content-type': 'application/json'}
  });

  instance.interceptors.request.use(config => {
    if (authenticationService.currentUser) {
      const token = authenticationService.currentUserValue.token;
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
    }
    return config;
  }, error => {
    Promise.reject(error);
  })

  // error
  instance.interceptors.response.use((response) => {
    return response;
  }, error => {
    const originalRequest = error.config;
    if (!originalRequest._retry && (error.response.status === 500 || error.response.status === 401))
    {
      originalRequest._retry = true;
      // return authenticationService.logout();
      authenticationService.refreshToken()
      .then(result => {
        if (result) {
          instance.defaults.headers.common['Authorization'] = `Bearer ` + result.token
          instance(originalRequest)
        }
      });
    }
  })