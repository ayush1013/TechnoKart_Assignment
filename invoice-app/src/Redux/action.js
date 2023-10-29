import * as types from "./actionTypes";
import axios from "axios";

export const getData = (params) => (dispatch) => {
  console.log("params in action", params);
  let url = `https://tough-fish-hem.cyclic.app/api`
  if(params){
    url = `https://tough-fish-hem.cyclic.app/api${params}`
  }
  console.log("url is", url)
  dispatch({ type: types.GET_DATA_REQUEST });
  axios
    .get(url)
    .then((res) => {
      // console.log("data from action", res.data.data);
      dispatch({ type: types.GET_DATA_SUCCESS, payload: res.data.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: types.GET_DATA_ERROR });
    });
};
