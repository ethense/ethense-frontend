import { api } from './NetworkService'
import { configService } from './ConfigService'

describe('Network Service', () => {
  it('should use the configured API server', () => {
    expect(api.defaults.baseURL).toEqual(configService.getApiServer())
  })
})
