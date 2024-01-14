import { SET_ROOM_INFO } from "../types/roomType";


const DEDAULT_STATE = {
  roomInfo: "",
};
const stringify = localStorage.getItem("ROOM_INFO");

if (stringify) {
  DEDAULT_STATE.roomInfo = JSON.parse(stringify);
}


export const roomReducer = (state = DEDAULT_STATE, action) => {

  switch (action.type) {
    case SET_ROOM_INFO: {
      state.roomInfo = action.payload;
      break;
    }
  }

  return { ...state };
}
