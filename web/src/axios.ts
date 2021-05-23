import axios from 'axios';

let baseURL = 'http://localhost:5000/api/v1';
if (process.env.NODE_ENV === 'production') {
  baseURL = '/api/v1';
}

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
