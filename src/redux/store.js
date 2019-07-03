import { applyMiddleware, createStore, compose } from 'redux'
import { Reducers } from './reducers/reducers'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const Store = createStore(
  Reducers,
  composeEnhancers(applyMiddleware(thunk))
)