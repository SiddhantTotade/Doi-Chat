import axios from 'axios';
// import {WS_URI} from 'react-native-dotenv';

WS_URI = 'http://192.168.43.248:8000';

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://192.168.43.248:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
