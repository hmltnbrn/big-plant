import { GET_ALL_PLANTS, GET_PLANT, GET_PLANT_WITH_COMMENTS, ADD_COMMENT, ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/types';

const initialState = {
  plants: [],
  plant: {},
  comments: [],
  favorites: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ALL_PLANTS:
      return {
        ...state,
        plants: action.payload
      }
    case GET_PLANT:
      return {
        ...state,
        plant: action.payload
      }
    case GET_PLANT_WITH_COMMENTS:
      return {
        ...state,
        plant: action.payload.plant,
        comments: action.payload.comments,
        favorites: action.payload.favorites
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(action.payload).slice().reverse()
      }
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.concat(action.payload).slice().reverse()
      }
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.id !== action.payload.id)
      }
    default: 
      return state;
  }
}
