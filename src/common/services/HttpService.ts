import axios from 'axios';

import PubSub from './PubSub';
import { API_PATH } from '../constants';
import TokenService from './TokenService';

const httpClient = axios.create({
  baseURL: API_PATH,
  withCredentials: true
});

httpClient.interceptors.response.use(
  response => response,
  async error => {
      const originalRequest = error.config;
      const hasAccessToken = TokenService.getToken();

      if (error.response.status === 401 && error.config && !error.config._isRetry && Boolean(hasAccessToken)) {
          originalRequest._isRetry = true;

          try {
              await axios.get(`${API_PATH}/refresh`, {withCredentials: true});
              return httpClient.request(originalRequest);
          } catch (e) {
              PubSub.emit('logout');
              // console.log('НЕ АВТОРИЗОВАН');
              throw e;
          }
      }

      throw error;
  }
);

type Params = Record<string, string | undefined>;

export class HttpService {
  private baseApi: string = '';

  constructor(baseApiPath: string = '') {
    this.baseApi = `${API_PATH}${baseApiPath}`;
  }

  get baseHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TokenService.getToken()}`
    };
  }

  async get(path: string, params?: Params) {
    const response = await httpClient.get(
      `${this.baseApi}/${path}`,
      { params, headers: this.baseHeaders }
    );

    return response.data; 
  }

  async post<T>(path: string, body: T, params?: Params) {
    const response = await httpClient.post(
      `${this.baseApi}/${path}`, body,
      { params, headers: this.baseHeaders }
    );

    return response.data;
  }
}