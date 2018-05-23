import { api } from '../services/NetworkService'
import { displayNotification } from './notification'
import { CREATE_USER_ERROR, EDIT_USER_ERROR } from '../constants/messages'

// action types
export const GET_USERS_REQUEST = 'authentication/GET_USERS_REQUEST'
export const GET_USERS_SUCCESS = 'authentication/GET_USERS_SUCCESS'
export const GET_USERS_FAILURE = 'authentication/GET_USERS_FAILURE'

export const CREATE_USER_REQUEST = 'authentication/CREATE_USER_REQUEST'
export const CREATE_USER_SUCCESS = 'authentication/CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'authentication/CREATE_USER_FAILURE'

export const EDIT_USER_REQUEST = 'authentication/EDIT_USER_REQUEST'
export const EDIT_USER_SUCCESS = 'authentication/EDIT_USER_SUCCESS'
export const EDIT_USER_FAILURE = 'authentication/EDIT_USER_FAILURE'

export const DELETE_USER_REQUEST = 'authentication/DELETE_USER_REQUEST'
export const DELETE_USER_SUCCESS = 'authentication/DELETE_USER_SUCCESS'
export const DELETE_USER_FAILURE = 'authentication/DELETE_USER_FAILURE'

const getUsersRequest = () => ({ type: GET_USERS_REQUEST })
const getUsersSuccess = response => ({
  type: GET_USERS_SUCCESS,
  payload: response,
})
const getUsersFailure = error => ({ type: GET_USERS_FAILURE, payload: error })

const createUserRequest = () => ({ type: CREATE_USER_REQUEST })
const createUserSuccess = response => ({
  type: CREATE_USER_SUCCESS,
  payload: response,
})
const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  payload: error,
})

const editUserRequest = () => ({ type: EDIT_USER_REQUEST })
const editUserSuccess = response => ({
  type: EDIT_USER_SUCCESS,
  payload: response,
})
const editUserFailure = error => ({ type: EDIT_USER_FAILURE, payload: error })

const deleteUserRequest = () => ({ type: DELETE_USER_REQUEST })
const deleteUserSuccess = response => ({
  type: DELETE_USER_SUCCESS,
  payload: response,
})
const deleteUserFailure = error => ({ type: DELETE_USER_FAILURE, payload: error })

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
    case CREATE_USER_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        reading: false,
        users: [...state.users, action.payload],
      }
    case CREATE_USER_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
      }
    case EDIT_USER_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case EDIT_USER_SUCCESS:
      const modifiedUser = action.payload
      let oldIndex = -1
      const users = state.users.filter((user, index) => {
        const isModified = user.id === modifiedUser.id
        if (isModified) {
          oldIndex = index
        }
        return !isModified
      })
      users.splice(oldIndex, 0, modifiedUser)

      return {
        ...state,
        reading: false,
        users,
      }
    case EDIT_USER_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
      }
    case DELETE_USER_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case DELETE_USER_SUCCESS:
      const deletedUserId = action.payload
      return {
        ...state,
        reading: false,
        users: state.users.filter(user => (user.id !== deletedUserId)),
      }
    case DELETE_USER_FAILURE:
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

export const createUser = values => async dispatch => {
  dispatch(createUserRequest())
  try {
    const response = await api.post('/users', values)
    dispatch(createUserSuccess(response.data))
    return response
  } catch (error) {
    dispatch(createUserFailure(error))
    dispatch(
      displayNotification(CREATE_USER_ERROR(error.response.data.error.message))
    )
    return error
  }
}

export const editUser = values => async dispatch => {
  const { id, ...other } = values
  dispatch(editUserRequest())
  try {
    const response = await api.patch(`/users/${id}`, other)
    dispatch(editUserSuccess(response.data))
    return response
  } catch (error) {
    dispatch(editUserFailure(error))
    dispatch(
      displayNotification(EDIT_USER_ERROR(error.response.data.error.message))
    )
    return error
  }
}

export const deleteUser = id => async dispatch => {
  dispatch(deleteUserRequest())
  try {
    const response = await api.delete(`users/${id}`)
    dispatch(deleteUserSuccess(id))
    return response
  } catch (error) {
    dispatch(deleteUserFailure(error))
    return error
  }
}
