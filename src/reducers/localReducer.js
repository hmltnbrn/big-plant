import { TOGGLE_DRAWER } from '../actions/types';

const initialState = {
  drawer: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_DRAWER:
      console.log("o")
      return {
        ...state,
        drawer: !state.drawer
      }
    default:
      return state;
  }
}
