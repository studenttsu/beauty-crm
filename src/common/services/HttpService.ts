import PubSub from './PubSub';
import { API_PATH } from '../constants';
import TokenService from './TokenService';

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

  async get(path: string) {
    const response = await fetch(`${this.baseApi}/${path}`, { headers: this.baseHeaders });
    return this._handleResponse(response);
  }

  async post<T>(path: string, body: T) {
    const stringifiedData = JSON.stringify(body);

    const response = await fetch(`${this.baseApi}/${path}`, {
      method: 'POST',
      body: stringifiedData,
      headers: this.baseHeaders
    });

    return this._handleResponse(response);
  }

  private async _handleResponse(response: Response) {
    const parsedData = await response.json();

    if (response.ok) {
      return parsedData;
    }

    if (response.status === 401) {
      PubSub.emit('logout');
    }
  }
}