import { combineReducers, legacy_createStore } from "redux"
import { userReducer } from "./reducers/userReducer";
import { roomReducer } from "./reducers/roomReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  roomReducer: roomReducer,
});

export const store = legacy_createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
