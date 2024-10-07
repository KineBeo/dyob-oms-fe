import axios from 'axios';

// Create a global axios instance
export const globalApi = axios.create({
  baseURL: 'http://localhost:3000',
});

