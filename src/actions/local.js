import { TOGGLE_DRAWER } from './types';

export const toggleDrawer = () => dispatch => {
  console.log("hehehehe")
  dispatch({
    type: TOGGLE_DRAWER
  });
}
