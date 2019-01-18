import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

const url = process.env.NODE_ENV === 'production' ? "" : "http://localhost:8080"

export const signUpUser = (user, history) => async dispatch => {
  try {
    await axios.post(`${url}/auth/SignUp`, user);
    history.push('/signin')
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

export const signInUser = (user, history) => async dispatch => {
  try {
    var res = await axios.post(`${url}/auth/SignIn`, user);
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    history.push('/');
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

export const logoutUser = (history) => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push('/signin');
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}
