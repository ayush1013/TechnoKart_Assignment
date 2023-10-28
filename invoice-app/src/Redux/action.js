import * as types from "./actionTypes";
import axios from "axios";

export const getData = (params)=> (dispatch)=>{
    dispatch({type: types.GET_DATA_REQUEST});
    axios.get(`https://tough-fish-hem.cyclic.app/api${params}`)
        .then((res)=>{
            console.log("data from action",res.data);
            dispatch({type: types.GET_DATA_SUCCESS, payload:res.data});
        })
        .catch((err)=>{
            console.log(err);
            dispatch({type: types.GET_DATA_ERROR});
        })
}
