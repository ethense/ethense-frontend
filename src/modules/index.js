import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authentication from './authentication'
import notification from './notification'
import appIdentity from './appIdentity'
import users from './users'
import claimTemplate from './claimTemplate'
import issuance from './issuance'

export default combineReducers({
  authentication,
  notification,
  appIdentity,
  users,
  claimTemplate,
  issuance,
  form: formReducer,
})
