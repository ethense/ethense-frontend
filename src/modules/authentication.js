import { api } from '../services/NetworkService'
import { configService } from '../services/ConfigService'

// action types
export const USERS_EXIST_REQUEST = 'authentication/USERS_EXIST_REQUEST'
export const USERS_EXIST_SUCCESS = 'authentication/USERS_EXIST_SUCCESS'
export const USERS_EXIST_FAILURE = 'authentication/USERS_EXIST_ERROR'

export const CREATE_ADMIN_REQUEST = 'authentication/CREATE_ADMIN_REQUEST'
export const CREATE_ADMIN_SUCCESS = 'authentication/CREATE_ADMIN_SUCCESS'
export const CREATE_ADMIN_FAILURE = 'authentication/CREATE_ADMIN_ERROR'

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
const createAdminSuccess = response => ({
  type: CREATE_ADMIN_SUCCESS,
  payload: response,
})
const createAdminFailure = error => ({
  type: CREATE_ADMIN_FAILURE,
  payload: error,
})

// state
const initialState = {
  usersExist: true,
  reading: false,
  error: null,
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
        // do something with response from create admin
        reading: false,
      }
    case CREATE_ADMIN_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
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
    const response = await api.post('/users/', values)
    dispatch(createAdminSuccess(response.data))
    return response
  } catch (error) {
    dispatch(createAdminFailure(error))
    return error
  }
}

export const login = () => async dispatch => {
  console.log('login')
}
