import axios from 'axios';
import {config as configs} from '../config/config'
const baseURL = '';

const instance = axios.create({
  validateStatus: (status: number) => {
    let correct = false;

    if (status >= 200 && status < 300) {
      correct = true;
    } else if (
      status === 401 ||
      status === 400 ||
      status === 403 ||
      status === 503 ||
      status === 422
    ) {
      correct = true;
    }

    return correct;
  },
})

instance.interceptors.request.use(async config => {
  if (config.url && config.url.charAt(0) === '/') {
    config.url = `${baseURL}${config.url}`;
  }
  
  const token = localStorage.getItem('authToken') || "";
  if (config.headers) {
      config.headers.authorization = `Bearer ${token}`;
  }

  return config;
}, error => Promise.reject(error));
  
instance.interceptors.request.use(async config => {
    const user = localStorage.getItem('authToken') || "";
    const baseURL = `${configs.SERVER_URL}`
    const token = user;
    if (config.url && config.url.charAt(0) === '/') {
      config.url = `${baseURL}${config.url}`;
    }

    if (config.headers) {
        config.headers.authorization = `Bearer ${token}`;
    }
   
    return config;
   }, error => Promise.reject(error));


   export default instance;