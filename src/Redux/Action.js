import axios from "axios";

export const LOAD_QUESTION = "LOAD_QUESTION";
export const Load_Question = (category) => {
 
  return async dispatch => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/get-question`, {
        params: { category }, 
        withCredentials: true
      });
      dispatch({
        type: LOAD_QUESTION,
        payload: response.data
      });
    }
    catch (error) {
      console.log("error in try block", error);
      
    }
  }
}
