import axios from 'axios'
import { configService } from './ConfigService'

class NetworkService {
  cacheAccessToken(accessToken) {
    api.defaults.headers['X-Access-Token'] = accessToken
  }
}

export const networkService = new NetworkService()

export const api = axios.create({
  baseURL: configService.getApiServer()
})
