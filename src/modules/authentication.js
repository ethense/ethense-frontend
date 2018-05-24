import { api, networkService } from '../services/NetworkService'
import { storageService } from '../services/StorageService'
import { displayNotification } from './notification'
import { INVALID_LOGIN_CREDENTIALS } from '../constants/messages'

// action types
export const USERS_EXIST_REQUEST = 'authentication/USERS_EXIST_REQUEST'
export const USERS_EXIST_SUCCESS = 'authentication/USERS_EXIST_SUCCESS'
export const USERS_EXIST_FAILURE = 'authentication/USERS_EXIST_ERROR'

export const CREATE_ADMIN_REQUEST = 'authentication/CREATE_ADMIN_REQUEST'
export const CREATE_ADMIN_SUCCESS = 'authentication/CREATE_ADMIN_SUCCESS'
export const CREATE_ADMIN_FAILURE = 'authentication/CREATE_ADMIN_ERROR'

export const LOGIN_REQUEST = 'authentication/LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'authentication/LOGIN_ERROR'

export const LOGOUT_REQUEST = 'authentication/LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'authentication/LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'authentication/LOGOUT_ERROR'

const usersExistRequest = () => ({ type: USERS_EXIST_REQUEST })
const usersExistSuccess = response => ({
  type: USERS_EXIST_SUCCESS,
  payload: response,
})
const usersExistFailure = error => ({
  type: USERS_EXIST_FAILURE,
  payload: error,
})

const createAdminRequest = () => ({ type: CREATE_ADMIN_REQUEST })
const createAdminSuccess = () => ({ type: CREATE_ADMIN_SUCCESS })
const createAdminFailure = error => ({
  type: CREATE_ADMIN_FAILURE,
  payload: error,
})

const loginRequest = () => ({ type: LOGIN_REQUEST })
const loginSuccess = response => ({
  type: LOGIN_SUCCESS,
  payload: response,
})
const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
})

const logoutRequest = () => ({ type: LOGOUT_REQUEST })
const logoutSuccess = response => ({
  type: LOGOUT_SUCCESS,
  payload: response,
})
const logoutFailure = error => ({
  type: LOGOUT_FAILURE,
  payload: error,
})

// state
const initialState = {
  usersExist: true,
  reading: false,
  error: null,
  loggedIn: false,
  credentials: null,
}

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case USERS_EXIST_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case USERS_EXIST_SUCCESS:
      return {
        ...state,
        usersExist: action.payload.usersExist,
        reading: false,
      }
    case USERS_EXIST_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
      }
    case CREATE_ADMIN_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        reading: false,
      }
    case CREATE_ADMIN_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
        credentials: null,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        reading: false,
        credentials: {
          id: action.payload.userId,
        }
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        reading: false,
        credentials: null,
        loggedIn: false,
      }
    case LOGOUT_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
        credentials: null,
        loggedIn: false,
      }
    default:
      return state
  }
}

// selectors

// action creators
export const getUsersExist = () => async dispatch => {
  dispatch(usersExistRequest())
  try {
    const response = await api.get('/users/exist')
    dispatch(usersExistSuccess(response.data))
    return response
  } catch (error) {
    dispatch(usersExistFailure(error))
    return error
  }
}

export const createAdmin = values => async dispatch => {
  dispatch(createAdminRequest())
  try {
    const response = await api.post('/users', values)
    dispatch(createAdminSuccess())
    dispatch(login(values))
    return response
  } catch (error) {
    dispatch(createAdminFailure(error))
    return error
  }
}

export const login = values => async dispatch => {
  dispatch(loginRequest())
  try {
    const response = await api.post('/users/login', values)
    const authInfo = response.data
    networkService.cacheAccessToken(authInfo.id)
    storageService.storeAuthInfo(authInfo)
    dispatch(loginSuccess(authInfo))
    return response
  } catch (error) {
    dispatch(loginFailure(error))
    const errorMessage =
      error.response.status === 401
        ? INVALID_LOGIN_CREDENTIALS
        : error.toString()
    dispatch(displayNotification(errorMessage))
    return error
  }
}

export const refreshLogin = authInfo => dispatch => {
  dispatch(loginSuccess(authInfo))
  networkService.cacheAccessToken(authInfo.id)
}

export const logout = () => async dispatch => {
  dispatch(logoutRequest())
  try {
    const response = await api.post('/users/logout')
    networkService.removeAccessToken()
    storageService.clearAuthInfo()
    dispatch(logoutSuccess())
    return response
  } catch (error) {
    dispatch(logoutFailure(error))
    networkService.removeAccessToken()
    storageService.clearAuthInfo()
    return error
  }
}
