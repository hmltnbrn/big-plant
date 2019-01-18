import axios from 'axios';
import { GET_ALL_PLANTS, GET_PLANT, GET_ERRORS, GET_PLANT_WITH_COMMENTS, ADD_COMMENT, ADD_FAVORITE, REMOVE_FAVORITE } from './types';

const url = process.env.NODE_ENV === 'production' ? "" : "http://localhost:8080";

export const getAllPlants = () => async dispatch => {
  try {
    var res = await axios.get(`${url}/api/Plants`);
    dispatch({ type: GET_ALL_PLANTS, payload: res.data })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

export const getAllPlantsWithFavorites = () => async dispatch => {
  try {
    var res = await axios.get(`${url}/api/Plants/Favorites`);
    dispatch({ type: GET_ALL_PLANTS, payload: res.data })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

export const getPlant = (id) => async dispatch => {
  try {
    var res = await axios.get(`${url}/api/Plants/${id}`);
    dispatch({ type: GET_PLANT, payload: res.data })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

export const getPlantWithComments = (id) => async dispatch => {
  try {
    var res = await axios.get(`${url}/api/Plants/${id}/Comments`);
    dispatch({ type: GET_PLANT_WITH_COMMENTS, payload: res.data })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

export const addComment = (plantId, comment) => async dispatch => {
  try {
    var res = await axios.put(`${url}/api/Comments/${plantId}`, { comment });
    dispatch({ type: ADD_COMMENT, payload: res.data })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

export const addFavorite = (plantId) => async dispatch => {
  try {
    var res = await axios.put(`${url}/api/Plants/${plantId}/Favorites`, {});
    dispatch({ type: ADD_FAVORITE, payload: res.data })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

export const removeFavorite = (plantId, favoriteId) => async dispatch => {
  try {
    var res = await axios.delete(`${url}/api/Plants/${plantId}/Favorites/${favoriteId}`, {});
    dispatch({ type: REMOVE_FAVORITE, payload: res.data })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}
