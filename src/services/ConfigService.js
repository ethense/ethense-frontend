class ConfigService {
  getApiServer = () => {
    const envApiServer = process.env.REACT_APP_API_URL
    return envApiServer || 'http://localhost:3000/api'
  }
}

export const configService = new ConfigService()
