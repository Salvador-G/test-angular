import { Injectable } from '@angular/core';
import axiosInstance from './axios.config'; // Importa la configuración de Axios

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async getData() {
    try {
      const response = await axiosInstance.get('/endpoint'); // Cambia '/endpoint' por el endpoint real
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async postData(data: any) {
    try {
      const response = await axiosInstance.post('/endpoint', data); // Cambia '/endpoint' por el endpoint real
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  }

  async login(credentials: { email: string, password: string }) {
    try {
      const response = await axiosInstance.post('/signin', credentials); // Se asume que tu backend está en la misma baseURL configurada en axios
      const token = response.data.token; // Asegúrate de que 'token' sea el nombre correcto en la respuesta
      this.saveToken(token);
      return token;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  private saveToken(token: string) {
    localStorage.setItem('authToken', token); // Guarda el token en el almacenamiento local
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  // Otros métodos para PUT, DELETE, etc.
}
