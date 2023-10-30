import * as types from "./actionTypes";
import axios from "axios";

export const getData = (params) => (dispatch) => {
  // console.log("params in action", params);
  let url = `https://tough-fish-hem.cyclic.app/api`;
  if (params) {
    url = `https://tough-fish-hem.cyclic.app/api${params}`;
  }
  // console.log("url is", url);
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

export const postData = (body) => (dispatch) => {
  dispatch({ type: types.POST_DATA_REQUEST });
  console.log(body);
  axios
    .post(`https://tough-fish-hem.cyclic.app/api/create`, body)
    .then((res) => {
      console.log(res.data.message);
      dispatch({ type: types.POST_DATA_SUCCESS, payload: res.data.message });
    })
    .catch((err) => {
      console.log(err.response.data.error);
      dispatch({
        type: types.POST_DATA_ERROR,
        payload: err.response.data.error,
      });
    });
};

export const updateData = (id,body)=> (dispatch) =>{
  dispatch({type:types.EDIT_DATA_REQUEST})
  axios
    .patch(`https://tough-fish-hem.cyclic.app/api/update/${id}`, body)
    .then((res) => {
      console.log("update success in action",res.data);
      dispatch({ type: types.EDIT_DATA_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log("update error in action",err.response.data);
      dispatch({
        type: types.EDIT_DATA_ERROR,
        payload: err.response.data.error,
      });
    });
}

export const deleteData = (id)=> (dispatch) =>{
  dispatch({type:types.DELETE_DATA_REQUEST})
  axios
    .delete(`https://tough-fish-hem.cyclic.app/api/delete/${id}`)
    .then((res) => {
      console.log("delete success in action",res.data);
      dispatch({ type: types.DELETE_DATA_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log("delete error in action",err);
      dispatch({
        type: types.DELETE_DATA_ERROR,
        payload: err.response.data.error,
      });
    });
}
