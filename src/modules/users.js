import { api } from '../services/NetworkService'

// action types
export const GET_USERS_REQUEST = 'authentication/GET_USERS_REQUEST'
export const GET_USERS_SUCCESS = 'authentication/GET_USERS_SUCCESS'
export const GET_USERS_FAILURE = 'authentication/GET_USERS_FAILURE'

const getUsersRequest = () => ({ type: GET_USERS_REQUEST })
const getUsersSuccess = response => ({
  type: GET_USERS_SUCCESS,
  payload: response,
})
const getUsersFailure = error => ({ type: GET_USERS_FAILURE, payload: error })

// state
const initialState = {
  users: [],
  reading: false,
  error: null,
}

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        reading: true,
        users: action.payload,
      }
    case GET_USERS_FAILURE:
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
export const getUsers = () => async dispatch => {
  dispatch(getUsersRequest())
  try {
    const response = await api.get('/users')
    dispatch(getUsersSuccess(response.data))
    return response
  } catch (error) {
    dispatch(getUsersFailure(error))
    return error
  }
}
