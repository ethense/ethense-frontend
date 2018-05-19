import { api } from '../services/NetworkService'

// action types
export const GET_APP_IDS_REQUEST = 'appIdentity/GET_APP_IDS_REQUEST'
export const GET_APP_IDS_SUCCESS = 'appIdentity/GET_APP_IDS_SUCCESS'
export const GET_APP_IDS_FAILURE = 'appIdentity/GET_APP_IDS_FAILURE'

const getAppIdsRequest = () => ({ type: GET_APP_IDS_REQUEST })
const getAppIdsSuccess = response => ({
  type: GET_APP_IDS_SUCCESS,
  payload: response,
})
const getAppIdsFailure = error => ({
  type: GET_APP_IDS_FAILURE,
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
      return {
        ...state,
        reading: true,
        error: null,
      }
    case GET_APP_IDS_SUCCESS:
      return {
        ...state,
        reading: false,
        identities: action.payload,
      }
    case GET_APP_IDS_FAILURE:
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
