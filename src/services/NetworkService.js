import axios from 'axios'
import { configService } from './ConfigService'

class NetworkService {
  cacheAccessToken(accessToken) {
    api.defaults.headers['X-Access-Token'] = accessToken
  }

  removeAccessToken() {
    delete api.defaults.headers['X-Access-Token']
  }
}

export const networkService = new NetworkService()

export const api = axios.create({
  baseURL: configService.getApiServer(),
})
