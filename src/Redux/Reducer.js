import { LOAD_QUESTION} from "./Action";
import { cartReducerInitData } from "./InitReducer";


export const cartReducer = (state = cartReducerInitData, action) => {
  switch (action.type) {

    case LOAD_QUESTION:
      return { ...state, questionContainer: action.payload };
      
    default:
      return state;
  }
}