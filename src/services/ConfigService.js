class ConfigService {
  getApiServer = () => {
    const envApiServer = process.env.REACT_APP_API_URL
    return envApiServer || 'http://localhost:3000/api'
  }

  getAuthKey = () => {
    const authKey = process.env.REACT_APP_AUTH_KEY
    return authKey || 'auth_ethense'
  }
}

export const configService = new ConfigService()
