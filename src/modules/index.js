import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authentication from './authentication'

export default combineReducers({
  authentication,
  form: formReducer,
})
