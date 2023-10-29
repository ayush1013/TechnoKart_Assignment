import * as types from "./actionTypes";

const initialState = {
  products: [],
  isError: false,
  isLoading: false,

  postSuccess: false,
  postError: false,
  postLoading: false,
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_DATA_REQUEST:
      return { ...state, isLoading: true };
    case types.GET_DATA_SUCCESS:
      return { ...state, isLoading: false, products: payload };
    case types.GET_DATA_ERROR:
      return { ...state, isLoading: false, isError: true };

    case types.POST_DATA_REQUEST:
      return { ...state, postLoading: true };
    case types.POST_DATA_SUCCESS:
      return { ...state, postLoading: false, postSuccess: payload };
    case types.POST_DATA_ERROR:
      return { ...state, postLoading: false, postError: payload };
    default:
      return state;
  }
};
