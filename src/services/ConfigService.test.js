import { configService } from './ConfigService'

describe('Config Service', () => {
  afterEach(() => {
    delete process.env.REACT_APP_API_URL
  })

  it('returns localhost:3000/api by default', () => {
    process.env.REACT_APP_API_URL = ''
    expect(configService.getApiServer()).toEqual('http://localhost:3000/api')
  })

  it('uses the REACT_APP_API_URL env var', () => {
    process.env.REACT_APP_API_URL = 'http://localhost:8080/api'
    expect(configService.getApiServer()).toEqual('http://localhost:8080/api')
  })
})
