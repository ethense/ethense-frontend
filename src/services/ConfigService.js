class ConfigService {
  getApiServer = () => {
    const apiServer =
      window.env && window.env.REACT_APP_API_URL
        ? window.env.REACT_APP_API_URL
        : process.env.REACT_APP_API_URL
    return apiServer || 'http://localhost:3000/api'
  }

  getAuthKey = () => {
    const authKey =
      window.env && window.env.REACT_APP_AUTH_KEY
        ? window.env.REACT_APP_AUTH_KEY
        : process.env.REACT_APP_AUTH_KEY
    return authKey || 'auth_ethense'
  }
}

export const configService = new ConfigService()
