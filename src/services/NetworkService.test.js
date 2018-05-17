import { api, networkService } from './NetworkService'
import { configService } from './ConfigService'

const ACCESS_TOKEN = 'FZz8cixMFNkZDudAxLPZFMRSR7AxGni'

describe('Network Service', () => {
  it('should use the configured API server', () => {
    expect(api.defaults.baseURL).toEqual(configService.getApiServer())
  })

  it('should set and remove the X-Access-Token header', () => {
    expect(api.defaults.headers['X-Access-Token']).toEqual(undefined)
    networkService.cacheAccessToken(ACCESS_TOKEN)
    expect(api.defaults.headers['X-Access-Token']).toEqual(ACCESS_TOKEN)
    networkService.removeAccessToken()
    expect(api.defaults.headers['X-Access-Token']).toEqual(undefined)
  })
})
