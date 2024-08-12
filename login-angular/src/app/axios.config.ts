import axios from 'axios';
import { environment } from '../enviroment';

const axiosInstance = axios.create({
  baseURL: environment.apiUrl, // Cambia esta URL por la de tu backend
  timeout: 10000, // Tiempo de espera de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
