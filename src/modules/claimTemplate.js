import { api } from '../services/NetworkService'
import { displayNotification } from './notification'
import {
  CREATE_CLAIM_TEMPLATE_ERROR,
  EDIT_CLAIM_TEMPLATE_ERROR,
} from '../constants/messages'

// action types
export const GET_CLAIM_TEMPLATES_REQUEST =
  'claimTemplate/GET_CLAIM_TEMPLATES_REQUEST'
export const GET_CLAIM_TEMPLATES_SUCCESS =
  'claimTemplate/GET_CLAIM_TEMPLATES_SUCCESS'
export const GET_CLAIM_TEMPLATES_FAILURE =
  'claimTemplate/GET_CLAIM_TEMPLATES_FAILURE'

export const CREATE_CLAIM_TEMPLATE_REQUEST =
  'claimTemplate/CREATE_CLAIM_TEMPLATE_REQUEST'
export const CREATE_CLAIM_TEMPLATE_SUCCESS =
  'claimTemplate/CREATE_CLAIM_TEMPLATE_SUCCESS'
export const CREATE_CLAIM_TEMPLATE_FAILURE =
  'claimTemplate/CREATE_CLAIM_TEMPLATE_FAILURE'

export const EDIT_CLAIM_TEMPLATE_REQUEST =
  'claimTemplate/EDIT_CLAIM_TEMPLATE_REQUEST'
export const EDIT_CLAIM_TEMPLATE_SUCCESS =
  'claimTemplate/EDIT_CLAIM_TEMPLATE_SUCCESS'
export const EDIT_CLAIM_TEMPLATE_FAILURE =
  'claimTemplate/EDIT_CLAIM_TEMPLATE_FAILURE'

export const DELETE_CLAIM_TEMPLATE_REQUEST =
  'claimTemplate/DELETE_CLAIM_TEMPLATE_REQUEST'
export const DELETE_CLAIM_TEMPLATE_SUCCESS =
  'claimTemplate/DELETE_CLAIM_TEMPLATE_SUCCESS'
export const DELETE_CLAIM_TEMPLATE_FAILURE =
  'claimTemplate/DELETE_CLAIM_TEMPLATE_FAILURE'

export const CLEAR_NEW_TEMPLATE_ID = 'claimTemplate/CLEAR_NEW_TEMPLATE_ID'

const getClaimTemplatesRequest = () => ({ type: GET_CLAIM_TEMPLATES_REQUEST })
const getClaimTemplatesSuccess = response => ({
  type: GET_CLAIM_TEMPLATES_SUCCESS,
  payload: response,
})
const getClaimTemplatesFailure = error => ({
  type: GET_CLAIM_TEMPLATES_FAILURE,
  payload: error,
})

const createClaimTemplateRequest = () => ({
  type: CREATE_CLAIM_TEMPLATE_REQUEST,
})
const createClaimTemplateSuccess = response => ({
  type: CREATE_CLAIM_TEMPLATE_SUCCESS,
  payload: response,
})
const createClaimTemplateFailure = error => ({
  type: CREATE_CLAIM_TEMPLATE_FAILURE,
  payload: error,
})

const editClaimTemplateRequest = () => ({ type: EDIT_CLAIM_TEMPLATE_REQUEST })
const editClaimTemplateSuccess = response => ({
  type: EDIT_CLAIM_TEMPLATE_SUCCESS,
  payload: response,
})
const editClaimTemplateFailure = error => ({
  type: EDIT_CLAIM_TEMPLATE_FAILURE,
  payload: error,
})

const deleteClaimTemplateRequest = () => ({
  type: DELETE_CLAIM_TEMPLATE_REQUEST,
})
const deleteClaimTemplateSuccess = response => ({
  type: DELETE_CLAIM_TEMPLATE_SUCCESS,
  payload: response,
})
const deleteClaimTemplateFailure = error => ({
  type: DELETE_CLAIM_TEMPLATE_FAILURE,
  payload: error,
})

// state
const initialState = {
  templates: [],
  reading: false,
  error: null,
  newTemplateId: null,
}

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CLAIM_TEMPLATES_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case GET_CLAIM_TEMPLATES_SUCCESS:
      return {
        ...state,
        reading: true,
        templates: action.payload,
      }
    case GET_CLAIM_TEMPLATES_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
      }
    case CREATE_CLAIM_TEMPLATE_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case CREATE_CLAIM_TEMPLATE_SUCCESS:
      const newTemplate = action.payload
      return {
        ...state,
        reading: false,
        templates: [...state.templates, newTemplate],
        newTemplateId: newTemplate.id,
      }
    case CREATE_CLAIM_TEMPLATE_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
      }
    case EDIT_CLAIM_TEMPLATE_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case EDIT_CLAIM_TEMPLATE_SUCCESS:
      // TODO: refactor to implementation from issuance.js
      const modifiedTemplate = action.payload
      let oldIndex = -1
      const templates = state.templates.filter((template, index) => {
        const isModified = template.id === modifiedTemplate.id
        if (isModified) {
          oldIndex = index
        }
        return !isModified
      })
      templates.splice(oldIndex, 0, modifiedTemplate)

      return {
        ...state,
        reading: false,
        templates,
      }
    case EDIT_CLAIM_TEMPLATE_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
      }
    case DELETE_CLAIM_TEMPLATE_REQUEST:
      return {
        ...state,
        reading: true,
        error: null,
      }
    case DELETE_CLAIM_TEMPLATE_SUCCESS:
      const deletedTemplateId = action.payload
      return {
        ...state,
        reading: false,
        templates: state.templates.filter(
          user => user.id !== deletedTemplateId
        ),
      }
    case DELETE_CLAIM_TEMPLATE_FAILURE:
      return {
        ...state,
        reading: false,
        error: action.payload,
      }
    case CLEAR_NEW_TEMPLATE_ID:
      return {
        ...state,
        newTemplateId: null,
      }
    default:
      return state
  }
}

// selectors

// action creators
export const getClaimTemplates = () => async dispatch => {
  dispatch(getClaimTemplatesRequest())
  try {
    const response = await api.get('/ClaimTemplates')
    dispatch(getClaimTemplatesSuccess(response.data))
    return response
  } catch (error) {
    dispatch(getClaimTemplatesFailure(error))
    return error
  }
}

export const createClaimTemplate = values => async dispatch => {
  dispatch(createClaimTemplateRequest())
  try {
    const response = await api.post('/ClaimTemplates', values)
    dispatch(createClaimTemplateSuccess(response.data))
    return response
  } catch (error) {
    dispatch(createClaimTemplateFailure(error))
    dispatch(
      displayNotification(
        CREATE_CLAIM_TEMPLATE_ERROR(error.response.data.error.message)
      )
    )
    return error
  }
}

export const editClaimTemplate = values => async dispatch => {
  const { id, ...other } = values
  dispatch(editClaimTemplateRequest())
  try {
    const response = await api.patch(`/ClaimTemplates/${id}`, other)
    dispatch(editClaimTemplateSuccess(response.data))
    dispatch(displayNotification('Claim Template Saved!'))
    return response
  } catch (error) {
    dispatch(editClaimTemplateFailure(error))
    dispatch(
      displayNotification(
        EDIT_CLAIM_TEMPLATE_ERROR(error.response.data.error.message)
      )
    )
    return error
  }
}

export const deleteClaimTemplate = id => async dispatch => {
  dispatch(deleteClaimTemplateRequest())
  try {
    const response = await api.delete(`/ClaimTemplates/${id}`)
    dispatch(deleteClaimTemplateSuccess(id))
    return response
  } catch (error) {
    dispatch(deleteClaimTemplateFailure(error))
    return error
  }
}

export const clearNewTemplateId = () => dispatch => {
  dispatch({ type: CLEAR_NEW_TEMPLATE_ID })
}
