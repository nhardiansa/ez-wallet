import { combineReducers } from "redux";

import authReducer from "./auth";
import historyReducer from "./history";
import userReducer from './user';

export default combineReducers({
  authReducer,
  historyReducer,
  userReducer
});
