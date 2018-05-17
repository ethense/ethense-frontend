import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authentication from './authentication'
import notification from './notification'

export default combineReducers({
  authentication,
  notification,
  form: formReducer,
})
