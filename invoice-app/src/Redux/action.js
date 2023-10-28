import * as types from "./actionTypes";
import axios from "axios";

export const getData = () => (dispatch) => {
    // console.log(params)
  dispatch({ type: types.GET_DATA_REQUEST });
  axios
    .get(`https://tough-fish-hem.cyclic.app/api`)
    .then((res) => {
      console.log("data from action", res.data.data);
      dispatch({ type: types.GET_DATA_SUCCESS, payload: res.data.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: types.GET_DATA_ERROR });
    });
};
