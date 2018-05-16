import axios from 'axios'
import { configService } from '../services/ConfigService'

// action types
export const USERS_EXIST_REQUEST = 'authentication/USERS_EXIST_REQUEST'
export const USERS_EXIST_SUCCESS = 'authentication/USERS_EXIST_SUCCESS'
export const USERS_EXIST_FAILURE = 'authentication/USERS_EXIST_ERROR'

const usersExistRequest = () => ({ type: USERS_EXIST_REQUEST })
const usersExistSuccess = response => ({
  type: USERS_EXIST_SUCCESS,
  payload: response,
})
const usersExistFailure = error => ({
  type: USERS_EXIST_FAILURE,
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
    default:
      return state
  }
}

// selectors

// action creators
export const getUsersExist = () => async dispatch => {
  dispatch(usersExistRequest())
  try {
    const response = await axios({
      url: configService.getApiServer() + '/users/exist',
      method: 'get',
    })
    dispatch(usersExistSuccess(response.data))
    return response
  } catch (error) {
    dispatch(usersExistFailure(error))
    return error
  }
}

export const createAdmin = () => async dispatch => {
  console.log('create admin')
}

export const login = () => async dispatch => {
  console.log('login')
}
