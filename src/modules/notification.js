// action types
export const SHOW_NOTIFICATION = 'notification/SHOW_NOTIFICATION'
export const HIDE_NOTIFICATION = 'notification/HIDE_NOTIFICATION'

const showNotification = message => ({
  type: SHOW_NOTIFICATION,
  payload: message,
})
const hideNotification = () => ({ type: HIDE_NOTIFICATION })

// state
const initialState = {
  open: false,
  message: null,
}

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        open: true,
        message: action.payload,
      }
    case HIDE_NOTIFICATION:
      return {
        ...state,
        open: false,
        message: null,
      }
    default:
      return state
  }
}

/// selectors

// action creators
export const displayNotification = message => dispatch => {
  // TODO: figure out how to set this up to hide a previously shown notification before showing a new one
  // TODO: figure out how to clear the timeout if a new notification gets shown
  dispatch(showNotification(message))
  setTimeout(() => {
    dispatch(hideNotification())
  }, 4000)
}
