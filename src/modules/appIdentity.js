import { api } from '../services/NetworkService'

// action types
export const GET_APP_IDS_REQUEST = 'appIdentity/GET_APP_IDS_REQUEST'
export const GET_APP_IDS_SUCCESS = 'appIdentity/GET_APP_IDS_SUCCESS'
export const GET_APP_IDS_FAILURE = 'appIdentity/GET_APP_IDS_FAILURE'

export const ADD_APP_ID_REQUEST = 'appIdentity/ADD_APP_ID_REQUEST'
export const ADD_APP_ID_SUCCESS = 'appIdentity/ADD_APP_ID_SUCCESS'
export const ADD_APP_ID_FAILURE = 'appIdentity/ADD_APP_ID_FAILURE'

export const DELETE_APP_ID_REQUEST = 'appIdentity/DELETE_APP_ID_REQUEST'
export const DELETE_APP_ID_SUCCESS = 'appIdentity/DELETE_APP_ID_SUCCESS'
export const DELETE_APP_ID_FAILURE = 'appIdentity/DELETE_APP_ID_FAILURE'

const getAppIdsRequest = () => ({ type: GET_APP_IDS_REQUEST })
const getAppIdsSuccess = response => ({
  type: GET_APP_IDS_SUCCESS,
  payload: response,
})
const getAppIdsFailure = error => ({
  type: GET_APP_IDS_FAILURE,
  payload: error,
})

const addAppIdRequest = () => ({ type: ADD_APP_ID_REQUEST })
const addAppIdSuccess = response => ({
  type: ADD_APP_ID_SUCCESS,
  payload: response,
})
const addAppIdFailure = error => ({
  type: ADD_APP_ID_FAILURE,
  payload: error,
})

const deleteAppIdRequest = () => ({ type: DELETE_APP_ID_REQUEST })
const deleteAppIdSuccess = response => ({
  type: DELETE_APP_ID_SUCCESS,
  payload: response,
})
const deleteAppIdFailure = error => ({
  type: DELETE_APP_ID_FAILURE,
  payload: error,
})

// state
const initialState = {
  identities: [],
  reading: false,
  error: null,
}

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_APP_IDS_REQUEST:
    case ADD_APP_ID_REQUEST:
    case DELETE_APP_ID_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case GET_APP_IDS_FAILURE:
    case ADD_APP_ID_FAILURE:
    case DELETE_APP_ID_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
      }
    case GET_APP_IDS_SUCCESS:
      return {
        ...state,
        reading: false,
        identities: action.payload,
      }
    case ADD_APP_ID_SUCCESS:
      const newAppId = action.payload
      return {
        ...state,
        reading: false,
        identities: [...state.identities, newAppId],
      }
    case DELETE_APP_ID_SUCCESS:
      const deletedAppId = action.payload
      return {
        ...state,
        reading: false,
        identities: state.identities.filter(appId => appId.id !== deletedAppId),
      }
    default:
      return state
  }
}

// selectors

// action creators
export const getAppIds = () => async dispatch => {
  dispatch(getAppIdsRequest())
  try {
    const response = await api.get('/AppIds')
    dispatch(getAppIdsSuccess(response.data))
    return response
  } catch (error) {
    dispatch(getAppIdsFailure(error))
    return error
  }
}

export const addAppId = values => async dispatch => {
  dispatch(addAppIdRequest())
  try {
    const response = await api.post('/AppIds', values)
    dispatch(addAppIdSuccess(response.data))
    return response
  } catch (error) {
    dispatch(addAppIdFailure(error))
    return error
  }
}

export const deleteAppId = id => async dispatch => {
  dispatch(deleteAppIdRequest())
  try {
    const response = await api.delete(`/AppIds/${id}`)
    dispatch(deleteAppIdSuccess(id))
    return response
  } catch (error) {
    dispatch(deleteAppIdFailure(error))
    return error
  }
}
