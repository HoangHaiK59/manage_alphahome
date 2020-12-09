import axios from 'axios';
import { authenticationService } from '../components/services';
export const instance = axios.create({
    baseURL: 'https://localhost:44352/api/',
    timeout: 6000,
    headers: {'content-type': 'application/json'}
  });


  // error
  instance.interceptors.response.use((response) => {
    return response;
  }, error => {
    const originalRequest = error.config;
    if (!originalRequest._retry && (error.response.status === 500 || error.response.status === 401))
    {
      originalRequest._retry = true;
      // return authenticationService.logout();
      return authenticationService.refreshToken();
    }
  })