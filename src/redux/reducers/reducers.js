import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

/* Reducers */
// ...

export const Reducers = combineReducers({
  form: formReducer
})