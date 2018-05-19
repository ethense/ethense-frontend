import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authentication from './authentication'
import notification from './notification'
import appIdentity from './appIdentity'

export default combineReducers({
  authentication,
  notification,
  appIdentity,
  form: formReducer,
})
