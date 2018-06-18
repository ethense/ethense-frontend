class ConfigService {
  getApiServer = () => {
    return process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
  }

  getAuthKey = () => {
    return process.env.REACT_APP_AUTH_KEY || 'auth_ethense'
  }
}

export const configService = new ConfigService()
