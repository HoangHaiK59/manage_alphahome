import axios from 'axios';
export const instance = axios.create({
    baseURL: 'https://localhost:44352/api/',
    timeout: 1000,
    headers: {'content-type': 'application/json'}
  });