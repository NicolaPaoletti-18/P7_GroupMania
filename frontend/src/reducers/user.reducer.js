import { GET_USER, UPLOAD_IMAGES } from "../actions/user.actions";

const initialState = {};


export default function userReducer(state = initialState, action ) {
  switch (action.type){
    case GET_USER:
      return action.payload;
    case UPLOAD_IMAGES:
      return {
        ... state,
        picture: action.payload,
      }
    default : 
    return state;

  }
}