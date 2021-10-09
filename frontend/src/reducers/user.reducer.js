import { GET_USER, UPDATE_BIO, UPDATE_PSEUDO, UPLOAD_IMAGES } from "../actions/user.actions";

const initialState = {};


export default function userReducer(state = initialState, action ) {
  switch (action.type){
    case GET_USER:
      return action.payload;
    case UPLOAD_IMAGES:
      return {
        ... state,
        image: action.payload,
      }
    case UPDATE_BIO:
      return{
        ...state,
        bio: action.payload,
      }
      case UPDATE_PSEUDO:
        return{
          ...state,
          pseudo: action.payload,
        }
    default : 
    return state;

  }
}