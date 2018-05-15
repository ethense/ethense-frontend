import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './modules/authentication'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    authReducer,
    composeEnhancers(applyMiddleware(thunk))
)
export { store }