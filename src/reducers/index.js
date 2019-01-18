import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import localReducer from './localReducer';
import authReducer from './authReducer';
import plantReducer from './plantReducer';

export default combineReducers({
  error: errorReducer,
  local: localReducer,
  auth: authReducer,
  plants: plantReducer
});
