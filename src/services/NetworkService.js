import axios from 'axios'
import { configService } from './ConfigService'

export const api = axios.create({
  baseURL: configService.getApiServer()
})
