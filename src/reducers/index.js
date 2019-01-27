import { combineReducers } from 'redux';
import userReducer from './userReducer'
import roomReducer from './roomReducer'
import chatReducer from './chatReducer'

export default combineReducers({
  user: userReducer,
  room: roomReducer,
  chat: chatReducer
})
