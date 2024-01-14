import { SET_USER_INFO } from "../types/userType";

const DEDAULT_STATE = {
  userInfo: null,
};
const stringify = localStorage.getItem("USER_INFO");
if (stringify) {
  DEDAULT_STATE.userInfo = JSON.parse(stringify);
}

export const userReducer = (state = DEDAULT_STATE, action) => {

  switch (action.type) {
    case SET_USER_INFO: {
      state.userInfo = action.payload;
      break;
    }
  }

  return { ...state };
}
