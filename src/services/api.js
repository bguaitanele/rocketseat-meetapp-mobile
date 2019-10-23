import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';

const api = axios.create({
  //emulador 10.0.2.2
  //dispositivo = ip da maquina
  //ios localhost
  baseURL: SERVER_URL,
});

export default api;
