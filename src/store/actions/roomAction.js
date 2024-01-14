import { SET_ROOM_INFO } from "../types/roomType";


export const setRoomInfoAction = (data) => {
  return {
    type: SET_ROOM_INFO,
    payload: data,
  };
}
