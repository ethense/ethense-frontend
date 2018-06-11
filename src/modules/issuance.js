import { api } from '../services/NetworkService'
import { displayNotification } from './notification'
import {
  PICKUP_EMAIL_SENT,
  PICKUP_EMAIL_ERROR,
  CREATE_ISSUANCE_ERROR,
  EDIT_ISSUANCE_ERROR,
  BATCH_ISSUE_STARTED,
  BATCH_ISSUE_ERROR,
  BATCH_ISSUE_COMPLETED,
} from '../constants/messages'

// action types
export const GET_ISSUANCES_REQUEST = 'issuance/GET_ISSUANCES_REQUEST'
export const GET_ISSUANCES_SUCCESS = 'issuance/GET_ISSUANCES_SUCCESS'
export const GET_ISSUANCES_FAILURE = 'issuance/GET_ISSUANCES_FAILURE'

export const CREATE_ISSUANCE_REQUEST = 'issuance/CREATE_ISSUANCE_REQUEST'
export const CREATE_ISSUANCE_SUCCESS = 'issuance/CREATE_ISSUANCE_SUCCESS'
export const CREATE_ISSUANCE_FAILURE = 'issuance/CREATE_ISSUANCE_FAILURE'

export const EDIT_ISSUANCE_REQUEST = 'issuance/EDIT_ISSUANCE_REQUEST'
export const EDIT_ISSUANCE_SUCCESS = 'issuance/EDIT_ISSUANCE_SUCCESS'
export const EDIT_ISSUANCE_FAILURE = 'issuance/EDIT_ISSUANCE_FAILURE'

export const DELETE_ISSUANCE_REQUEST = 'issuance/DELETE_ISSUANCE_REQUEST'
export const DELETE_ISSUANCE_SUCCESS = 'issuance/DELETE_ISSUANCE_SUCCESS'
export const DELETE_ISSUANCE_FAILURE = 'issuance/DELETE_ISSUANCE_FAILURE'

export const CLEAR_NEW_ISSUANCE_ID = 'issuance/CLEAR_NEW_ISSUANCE_ID'

export const ISSUE_REQUEST = 'issuance/ISSUE_REQUEST'
export const ISSUE_SUCCESS = 'issuance/ISSUE_SUCCESS'
export const ISSUE_FAILURE = 'issuance/ISSUE_FAILURE'

export const BATCH_ISSUE_REQUEST = 'issuance/BATCH_ISSUE_REQUEST'
export const BATCH_ISSUE_START = 'issuance/BATCH_ISSUE_START'
export const BATCH_ISSUE_PROGRESS = 'issuance/BATCH_ISSUE_PROGRESS'
export const BATCH_ISSUE_SUCCESS = 'issuance/BATCH_ISSUE_SUCCESS'
export const BATCH_ISSUE_FAILURE = 'issuance/BATCH_ISSUE_FAILURE'

const getIssuancesRequest = () => ({ type: GET_ISSUANCES_REQUEST })
const getIssuancesSuccess = response => ({
  type: GET_ISSUANCES_SUCCESS,
  payload: response,
})
const getIssuancesFailure = error => ({
  type: GET_ISSUANCES_FAILURE,
  payload: error,
})

const createIssuanceRequest = () => ({
  type: CREATE_ISSUANCE_REQUEST,
})
const createIssuanceSuccess = response => ({
  type: CREATE_ISSUANCE_SUCCESS,
  payload: response,
})
const createIssuanceFailure = error => ({
  type: CREATE_ISSUANCE_FAILURE,
  payload: error,
})

const editIssuanceRequest = () => ({ type: EDIT_ISSUANCE_REQUEST })
const editIssuanceSuccess = response => ({
  type: EDIT_ISSUANCE_SUCCESS,
  payload: response,
})
const editIssuanceFailure = error => ({
  type: EDIT_ISSUANCE_FAILURE,
  payload: error,
})

const deleteIssuanceRequest = () => ({
  type: DELETE_ISSUANCE_REQUEST,
})
const deleteIssuanceSuccess = response => ({
  type: DELETE_ISSUANCE_SUCCESS,
  payload: response,
})
const deleteIssuanceFailure = error => ({
  type: DELETE_ISSUANCE_FAILURE,
  payload: error,
})

const issueRequest = () => ({ type: ISSUE_REQUEST })
const issueSuccess = response => ({
  type: ISSUE_SUCCESS,
  payload: response,
})
const issueFailure = error => ({
  type: ISSUE_FAILURE,
  payload: error,
})

const batchIssueRequest = () => ({ type: BATCH_ISSUE_REQUEST })
const batchIssueStart = response => ({
  type: BATCH_ISSUE_START,
  payload: response,
})
const batchIssueProgress = response => ({
  type: BATCH_ISSUE_PROGRESS,
  payload: response,
})
const batchIssueSuccess = response => ({
  type: BATCH_ISSUE_SUCCESS,
  payload: response,
})
const batchIssueFailure = error => ({
  type: BATCH_ISSUE_FAILURE,
  payload: error,
})

//state
const initialState = {
  issuances: [],
  newIssuanceId: null,
  reading: false,
  error: null,
}

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ISSUANCES_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case GET_ISSUANCES_SUCCESS:
      return {
        ...state,
        reading: true,
        issuances: action.payload,
      }
    case GET_ISSUANCES_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
      }
    case CREATE_ISSUANCE_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case CREATE_ISSUANCE_SUCCESS:
      const newIssuance = action.payload
      return {
        ...state,
        reading: false,
        issuances: [...state.issuances, newIssuance],
        newIssuanceId: newIssuance.id,
      }
    case CREATE_ISSUANCE_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
      }
    case EDIT_ISSUANCE_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case EDIT_ISSUANCE_SUCCESS:
      return {
        ...state,
        reading: false,
        issuances: state.issuances.map(
          issuance =>
            issuance.id === action.payload.id
              ? { ...action.payload }
              : { ...issuance }
        ),
      }
    case EDIT_ISSUANCE_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
      }
    case DELETE_ISSUANCE_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case DELETE_ISSUANCE_SUCCESS:
      const deletedIssuanceId = action.payload
      return {
        ...state,
        reading: false,
        issuances: state.issuances.filter(
          issuance => issuance.id !== deletedIssuanceId
        ),
      }
    case DELETE_ISSUANCE_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
      }
    case CLEAR_NEW_ISSUANCE_ID:
      return {
        ...state,
        newIssuanceId: null,
      }
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
    case BATCH_ISSUE_REQUEST:
      return {
        ...state,
        reading: false,
        error: null,
      }
    case BATCH_ISSUE_START:
      const issuance = action.payload.issuance
      console.log(issuance)
      return {
        ...state,
        reading: false,
        issuances: state.issuances.map(
          i => (i.id === issuance.id ? issuance : i)
        ),
        newIssuanceId: issuance.id,
      }
    case BATCH_ISSUE_FAILURE:
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
export const getIssuances = () => async dispatch => {
  dispatch(getIssuancesRequest())
  try {
    const response = await api.get('/Issuances')
    dispatch(getIssuancesSuccess(response.data))
    return response
  } catch (error) {
    dispatch(getIssuancesFailure(error))
    return error
  }
}

export const createIssuance = values => async dispatch => {
  dispatch(createIssuanceRequest())
  try {
    const response = await api.post('/Issuances', values)
    dispatch(createIssuanceSuccess(response.data))
    return response
  } catch (error) {
    dispatch(createIssuanceFailure(error))
    dispatch(
      displayNotification(
        CREATE_ISSUANCE_ERROR(error.response.data.error.message)
      )
    )
    return error
  }
}

export const editIssuance = values => async dispatch => {
  const { id, ...other } = values
  dispatch(editIssuanceRequest())
  try {
    const response = await api.patch(`/Issuances/${id}`, other)
    dispatch(editIssuanceSuccess(response.data))
    dispatch(displayNotification('Issuance Saved!'))
    return response
  } catch (error) {
    console.error(error)
    dispatch(editIssuanceFailure(error))
    dispatch(
      displayNotification(
        EDIT_ISSUANCE_ERROR(error.response.data.error.message)
      )
    )
    return error
  }
}

export const deleteIssuance = id => async dispatch => {
  dispatch(deleteIssuanceRequest())
  try {
    const response = await api.delete(`/Issuances/${id}`)
    dispatch(deleteIssuanceSuccess(id))
    return response
  } catch (error) {
    dispatch(deleteIssuanceFailure(error))
    return error
  }
}

export const clearNewIssuanceId = () => dispatch => {
  dispatch({ type: CLEAR_NEW_ISSUANCE_ID })
}

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

export const batchIssue = id => async dispatch => {
  dispatch(batchIssueRequest())
  try {
    const response = await api.get(`/Issuances/${id}/batchIssue`)
    dispatch(batchIssueStart(response.data))
    dispatch(displayNotification(BATCH_ISSUE_STARTED))
    // set a timeout to dispatch batch issue progress
  } catch (error) {
    dispatch(batchIssueFailure(error))
    dispatch(displayNotification(BATCH_ISSUE_ERROR(error)))
  }
}
