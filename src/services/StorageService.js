import { configService } from './ConfigService'

class StorageService {
  storeAuthInfo(value) {
    let toStore = value
    if (value !== value.toString()) {
      toStore = JSON.stringify(value)
    }
    localStorage.setItem(configService.getAuthKey(), btoa(toStore))
  }

  getAuthInfo() {
    var value = localStorage.getItem(configService.getAuthKey())
    return value ? JSON.parse(atob(value)) : null
  }

  clearAuthInfo() {
    localStorage.removeItem(btoa(configService.getAuthKey()))
  }
}

export const storageService = new StorageService()
