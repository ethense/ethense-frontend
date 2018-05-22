import { api } from '../services/NetworkService'
import { displayNotification } from './notification'
import { PICKUP_EMAIL_SENT, PICKUP_EMAIL_ERROR } from '../constants/messages'

// action types
export const ISSUE_REQUEST = 'issuance/ISSUE_REQUEST'
export const ISSUE_SUCCESS = 'issuance/ISSUE_SUCCESS'
export const ISSUE_FAILURE = 'issuance/ISSUE_FAILURE'

const issueRequest = () => ({ type: ISSUE_REQUEST })
const issueSuccess = response => ({
  type: ISSUE_SUCCESS,
  payload: response,
})
const issueFailure = error => ({
  type: ISSUE_FAILURE,
  payload: error,
})

//state
const initialState = {
  reading: false,
  error: null,
}

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ISSUE_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case ISSUE_SUCCESS:
      return {
        ...state,
        reading: false,
      }
    case ISSUE_FAILURE:
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
export const issue = (appId, email, schema) => async dispatch => {
  dispatch(issueRequest())
  try {
    const response = await api.post(`/AppIds/${appId}/issue`, {
      email,
      schema,
    })
    dispatch(issueSuccess(response.data))
    dispatch(displayNotification(PICKUP_EMAIL_SENT(email)))
    return response
  } catch (error) {
    dispatch(issueFailure(error))
    dispatch(displayNotification(PICKUP_EMAIL_ERROR))
  }
}
