import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.16.20.212:3000',
  // baseURL: 'http://192.168.15.69:3000',
  // baseURL: 'http://192.168.0.212:3000',
});

export default api;
