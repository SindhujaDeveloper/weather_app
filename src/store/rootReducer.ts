import { authReducer, weatherReducer } from 'reducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  auth: authReducer,
  weather: weatherReducer
})
